const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || 'qwen/qwen-3-coder-next';

function checkApiKey() {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE' || API_KEY.trim() === '') {
    throw new Error('Chưa cấu hình API Key. Vùi lòng sao chép file .env.example thành .env và điền OPENROUTER_API_KEY của bạn.');
  }
}

const TINIX_CATALOG = {
  themes: ['dark', 'customed', 'macarons', 'walden', 'purplePassion', 'vintage', 'chalk', 'westeros', 'wonderland', 'essos', 'shine', 'roma'],
  charts: {
    'Bar': 'Biểu đồ cột. Phù hợp so sánh các hạng mục.',
    'Line': 'Biểu đồ đường. Phù hợp cho xu hướng theo thời gian.',
    'Pie': 'Biểu đồ tròn. Phù hợp cho tỷ trọng/phần trăm.',
    'Table': 'Bảng. Phù hợp cho danh sách chi tiết hoặc xếp hạng.',
    'Radar': 'Biểu đồ radar. Phù hợp so sánh nhiều thuộc tính của cùng một đối tượng.',
    'Funnel': 'Biểu đồ phễu. Phù hợp biểu diễn quy trình hoặc tỷ lệ chuyển đổi.',
    'Heatmap': 'Bản đồ nhiệt. Thể hiện mật độ dữ liệu theo 2 chiều phân loại.',
    'TreeMap': 'Biểu đồ cây. Thể hiện cấu trúc phân cấp hoặc tỷ trọng diện tích.',
    'Scatter': 'Biểu đồ phân tán. Phù hợp tìm tương quan giữa 2 cột số liệu.'
  }
};

/**
 * Lấy nội dung text từ phản hồi AI (xử lý Qwen reasoning model)
 */
function getAIContent(response) {
  const msg = response.data.choices[0].message;
  // Qwen reasoning model có thể trả content = null, dữ liệu nằm trong reasoning_content
  let content = msg.content || msg.reasoning_content || '';
  console.log('[AI DEBUG] Raw content type:', typeof content, '| Length:', content?.length || 0);
  console.log('[AI DEBUG] Raw content preview:', content?.substring(0, 200));
  
  // Loại bỏ thẻ <think>...</think> mà Qwen reasoning model hay chèn vào
  content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  return content;
}

/**
 * Trích xuất JSON từ chuỗi phản hồi của AI
 */
function extractJSON(content) {
  if (!content) return null;
  try {
    // Loại bỏ markdown code block nếu có (```json ... ```)
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    const match = content.match(/(\{[\s\S]*\})/);
    if (match) {
      return JSON.parse(match[0]);
    }
    // Thử parse trực tiếp
    return JSON.parse(content);
  } catch (error) {
    console.error('JSON Extraction Error:', error.message);
    console.error('Content that failed to parse:', content?.substring(0, 300));
    return null;
  }
}

/**
 * Tự động phân tích Schema từ dữ liệu (không cần AI)
 */
function localSchemaAnalysis(sampleData) {
  if (!sampleData || sampleData.length === 0) return { columns: [], insights: [] };
  const keys = Object.keys(sampleData[0]);
  const columns = keys.map(key => {
    const sampleValues = sampleData.map(row => row[key]).filter(v => v != null);
    const isNumber = sampleValues.every(v => typeof v === 'number' || !isNaN(Number(v)));
    return {
      name: key,
      type: isNumber ? 'metric' : 'dimension',
      subType: isNumber ? 'number' : 'category',
      description: `Cột "${key}" (${isNumber ? 'số liệu' : 'phân loại'})`
    };
  });
  return {
    columns,
    insights: [
      `Tập dữ liệu có ${keys.length} cột và ${sampleData.length} dòng mẫu.`,
      `Gồm ${columns.filter(c => c.type === 'metric').length} cột số liệu và ${columns.filter(c => c.type === 'dimension').length} cột phân loại.`
    ]
  };
}

/**
 * Phân tích Schema của tập dữ liệu
 */
async function analyzeDatasetSchema(sampleData) {
  checkApiKey();
  const prompt = `Bạn là chuyên gia phân tích dữ liệu. Dữ liệu mẫu (JSON):
${JSON.stringify(sampleData)}

Trả về JSON duy nhất với cấu trúc sau (KHÔNG giải thích, KHÔNG markdown, KHÔNG thẻ think):
{"columns":[{"name":"tên_cột_chính_xác","type":"dimension|metric","subType":"time|geography|category|number","description":"mô tả"}],"insights":["nhận định 1","nhận định 2"]}

Yêu cầu: "name" phải trùng khớp 100% với key trong dữ liệu JSON mẫu. Chỉ trả về JSON thuần.`;

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: MODEL,
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const content = getAIContent(response);
    const result = extractJSON(content);
    
    if (result && result.columns && result.columns.length > 0) {
      return result;
    }
    
    // AI không trả được kết quả hợp lệ → dùng phân tích cục bộ
    console.log('[AI] Kết quả AI không hợp lệ, sử dụng phân tích cục bộ.');
    return localSchemaAnalysis(sampleData);
  } catch (error) {
    console.error('AI Analysis Error:', error.response?.data || error.message);
    // Fallback: phân tích cục bộ LUÔN trả về kết quả
    console.log('[AI] Lỗi AI, sử dụng phân tích cục bộ.');
    return localSchemaAnalysis(sampleData);
  }
}

/**
 * Gợi ý danh sách biểu đồ dựa trên Schema đã xác nhận
 */
async function suggestCharts(confirmedSchema) {
  checkApiKey();
  const prompt = `Dựa trên cấu trúc dữ liệu đã xác nhận, gợi ý các biểu đồ phân tích sâu sắc nhất.
  YÊU CẦU:
  - Gợi ý từ 4 đến 10 biểu đồ tùy theo độ đa dạng của dữ liệu.
  - CÁC LOẠI BIỂU ĐỒ ĐƯỢC PHÉP: "Bar", "Line", "Pie", "Table", "Map", "Radar", "Funnel", "Heatmap", "TreeMap", "Scatter".
  - HƯỚNG DẪN BỐ CỤC (Layout):
    + "w" (chiều rộng): từ 4 đến 12 (lưới 12 cột). Bar/Line thường là 6-12, Pie/Radar thường là 4-6, Table nên là 12.
    + "h" (chiều cao): từ 300 đến 600.
  - HƯỚNG DẪN CHỌN:
    + "Radar": Khi muốn so sánh nhiều thuộc tính (metrics) của cùng một đối tượng.
    + "Funnel": Khi dữ liệu có tính chất quy trình, giai đoạn.
    + "Heatmap": Khi muốn thể hiện mật độ dữ liệu theo hai chiều phân loại.
    + "TreeMap": Khi dữ liệu có tính chất phân cấp hoặc muốn so sánh tỷ trọng diện tích.
    + "Scatter": Khi muốn thể hiện tương quan giữa 2 cột số liệu (mapping.x và mapping.y đều là metric).
    + "Map": Khi có cột về địa lý.
    + "Pie": Khi so sánh thành phần/tỷ lệ (tối đa 6-8 phần tử).
  - CHỈ SỐ ẢO (Virtual Metrics):
    + Nếu cần một cột số liệu không có sẵn (ví dụ: Lợi nhuận = Doanh thu - Chi phí), hãy gợi ý nó.
    + Khi dùng chỉ số ảo, thêm thuộc tính 'virtual: true' và 'formula: \"row[\'Doanh thu\'] - row[\'Chi phí\']\"' vào trong chart object.
  - Mỗi biểu đồ phải mapping đúng tên cột từ Schema (case-sensitive, chính xác từng ký tự).
  - mapping.x là cột phân loại/địa điểm (dimension), mapping.y là cột số liệu (metric).
Schema: ${JSON.stringify(confirmedSchema)}

Danh mục biểu đồ: ${JSON.stringify(TINIX_CATALOG.charts)}
Themes: ${JSON.stringify(TINIX_CATALOG.themes)}

Trả về JSON duy nhất (KHÔNG giải thích, KHÔNG markdown, KHÔNG thẻ think):
{
  "suggestedTheme": "tên theme",
  "executiveSummary": "Tóm tắt 1-3 câu về ý nghĩa quan trọng nhất của tập dữ liệu này.",
  "charts": [
    {
      "id": "1",
      "title": "Tiêu đề",
      "chartType": "Bar",
      "w": 6,
      "h": 400,
      "selected": true,
      "reason": "Lý do phân tích chi tiết (2-3 câu)",
      "mapping": {"x": "tên_cột_dimension", "y": "tên_cột_metric"}
    }
  ]
}

Chỉ trả về JSON thuần.`;

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: MODEL,
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const content = getAIContent(response);
    const result = extractJSON(content);
    if (result && (result.charts || result.suggestedTheme)) {
      return result;
    }
    
    // Fallback nếu AI trả về không hợp lệ
    console.log('[AI] Suggest không hợp lệ, sử dụng gợi ý mặc định.');
    return localChartSuggestion(confirmedSchema);
  } catch (error) {
    console.error('AI Suggestion Error:', error.response?.data || error.message);
    console.log('[AI] Lỗi suggest, sử dụng gợi ý mặc định.');
    return localChartSuggestion(confirmedSchema);
  }
}

/**
 * Gợi ý biểu đồ cục bộ (fallback khi AI lỗi)
 */
function localChartSuggestion(confirmedSchema) {
  // Duyệt qua schema để tìm cột phù hợp
  const cols = Array.isArray(confirmedSchema.columns) ? confirmedSchema.columns : (Array.isArray(confirmedSchema) ? confirmedSchema : []);
  if (cols.length === 0) {
    return { suggestedTheme: 'chalk', charts: [] };
  }
  const dims = cols.filter(c => c.type === 'dimension');
  const metrics = cols.filter(c => c.type === 'metric');
  const labelCol = (dims[0] || cols[0]).name;
  const valueCol = (metrics[0] || cols[cols.length - 1]).name;
  // Tìm thêm cột metric thứ 2 nếu có
  const valueCol2 = (metrics[1] || metrics[0] || cols[cols.length - 1]).name;
  // Tìm cột dimension thứ 2 nếu có
  const labelCol2 = (dims[1] || dims[0] || cols[0]).name;

  return {
    suggestedTheme: 'chalk',
    charts: [
      { id: '1', title: `So sánh ${valueCol} theo ${labelCol}`, chartType: 'Bar', selected: true, reason: `So sánh trực quan giá trị ${valueCol} giữa các nhóm ${labelCol}.`, mapping: { x: labelCol, y: valueCol } },
      { id: '2', title: `Xu hướng ${valueCol}`, chartType: 'Line', selected: true, reason: `Theo dõi biến động giá trị ${valueCol} theo ${labelCol}.`, mapping: { x: labelCol, y: valueCol } },
      { id: '3', title: `Cơ cấu ${labelCol}`, chartType: 'Pie', selected: true, reason: `Phân tích tỷ trọng đóng góp của từng ${labelCol} vào tổng ${valueCol}.`, mapping: { x: labelCol, y: valueCol } },
      { id: '4', title: `Biến động ${valueCol2} theo ${labelCol2}`, chartType: 'Bar', selected: true, reason: `So sánh chỉ số ${valueCol2} giữa các nhóm ${labelCol2}.`, mapping: { x: labelCol2, y: valueCol2 } },
      { id: '5', title: 'Bảng dữ liệu chi tiết', chartType: 'Table', selected: true, reason: `Liệt kê chi tiết ${labelCol} và ${valueCol} để phục vụ đối soát.`, mapping: { x: labelCol, y: valueCol } }
    ]
  };
}

module.exports = {
  analyzeDatasetSchema,
  suggestCharts
};
