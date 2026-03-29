const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const { analyzeDatasetSchema, suggestCharts } = require('./ai.service');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// --- Auto-BI AI Routes ---

app.post('/api/auto-bi/analyze', async (req, res) => {
  try {
    const { sampleData } = req.body;
    const analysis = await analyzeDatasetSchema(sampleData);
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auto-bi/suggest', async (req, res) => {
  try {
    const { confirmedSchema } = req.body;
    const suggestions = await suggestCharts(confirmedSchema);
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- API PROJECTS ---

// Lấy danh sách dự án
app.get('/api/projects', (req, res) => {
  try {
    const projects = db.prepare('SELECT * FROM projects ORDER BY updated_at DESC').all();
    const result = projects.map(p => {
      const config = JSON.parse(p.config);
      return { ...config, id: p.id };
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lưu hoặc cập nhật dự án
app.get('/api/projects/:id', (req, res) => {
  try {
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({
      id: project.id,
      ...JSON.parse(project.config)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', (req, res) => {
  const { id, ...config } = req.body;
  if (!id) return res.status(400).json({ error: 'ID is required' });

  try {
    const configStr = JSON.stringify({ ...config, id });
    const stmt = db.prepare(`
      INSERT INTO projects (id, config, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        config=excluded.config,
        updated_at=CURRENT_TIMESTAMP
    `);
    stmt.run(id, configStr);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  try {
    console.log(`[DELETE_PROJECT] Attempting to delete ID: ${id}`);
    const info = db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    
    if (info.changes > 0) {
      console.log(`[DELETE_PROJECT] Success: Deleted ID ${id}`);
      res.json({ success: true, changes: info.changes });
    } else {
      console.warn(`[DELETE_PROJECT] Not Found: No project with ID ${id}`);
      res.status(404).json({ success: false, error: 'Project not found' });
    }
  } catch (error) {
    console.error(`[DELETE_PROJECT] 500: Error deleting ${id}`, error);
    res.status(500).json({ error: error.message });
  }
});

// --- API USER TEMPLATES ---

// Lấy danh sách mẫu cá nhân
app.get('/api/user-templates', (req, res) => {
  try {
    const templates = db.prepare('SELECT * FROM user_templates ORDER BY created_at DESC').all();
    const result = templates.map(t => ({
      id: t.id,
      title: t.title,
      image: t.image,
      config: JSON.parse(t.config),
      createTime: t.created_at
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lưu mẫu cá nhân
app.post('/api/user-templates', (req, res) => {
  const { id, title, image, config } = req.body;
  try {
    const configStr = JSON.stringify(config);
    db.prepare('INSERT OR REPLACE INTO user_templates (id, title, image, config) VALUES (?, ?, ?, ?)')
      .run(id, title, image, configStr);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xóa mẫu cá nhân
app.delete('/api/user-templates/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM user_templates WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- API TEMPLATE OVERRIDES ---

app.get('/api/template-overrides', (req, res) => {
  try {
    const overrides = db.prepare('SELECT * FROM template_overrides').all();
    res.json(overrides.map(o => JSON.parse(o.config)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/template-overrides', (req, res) => {
  const list = req.body; // Mảng các model ghi đè
  try {
    db.transaction(() => {
      db.prepare('DELETE FROM template_overrides').run();
      const insert = db.prepare('INSERT INTO template_overrides (id, config) VALUES (?, ?)');
      for (const item of list) {
        insert.run(item.id, JSON.stringify(item));
      }
    })();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- API SYSTEM TEMPLATES (ADMIN) ---

app.get('/api/system-templates', (req, res) => {
  try {
    const templates = db.prepare('SELECT * FROM system_templates').all();
    res.json(templates.map(t => ({
      id: t.id,
      title: t.title,
      category: t.category,
      image: t.image,
      config: JSON.parse(t.config)
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/system-templates', (req, res) => {
  const { id, title, image, config } = req.body;
  try {
    const configStr = JSON.stringify(config);
    db.prepare('INSERT OR REPLACE INTO system_templates (id, title, image, config) VALUES (?, ?, ?, ?)')
      .run(id, title, image, configStr);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// APIs cho Datasets
app.get('/api/datasets', (req, res) => {
  try {
    const datasets = db.prepare('SELECT * FROM datasets ORDER BY updated_at DESC').all();
    res.json(datasets.map(d => ({
      ...d,
      content: JSON.parse(d.content),
      bi_config: d.bi_config ? JSON.parse(d.bi_config) : null
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/datasets/:id', (req, res) => {
  const datasetId = req.params.id;
  const { includeMeta } = req.query; // Thêm check query param
  try {
    console.log(`[DATASET_FETCH] Requesting ID: ${datasetId} (Meta: ${includeMeta})`);
    const dataset = db.prepare('SELECT * FROM datasets WHERE id = ?').get(datasetId);
    if (!dataset) {
      console.warn(`[DATASET_FETCH] 404: Dataset ${datasetId} not found in DB`);
      return res.status(404).json({ error: 'Dataset not found', requestedId: datasetId });
    }
    
    // Nếu yêu cầu meta (cho UI quản lý), trả về toàn bộ đối tượng
    if (includeMeta === 'true') {
      res.json({
        ...dataset,
        content: JSON.parse(dataset.content),
        bi_config: dataset.bi_config ? JSON.parse(dataset.bi_config) : null
      });
    } else {
      // Mặc định trả về chỉ nội dung mảng dữ liệu (cho Pond/Charts)
      console.log(`[DATASET_FETCH] Success: Returning RAW DATA for ${dataset.name}`);
      res.json(JSON.parse(dataset.content));
    }
  } catch (error) {
    console.error(`[DATASET_FETCH] 500: Error fetching ${datasetId}`, error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint Debug cho FE
app.get('/api/debug/datasets', (req, res) => {
  try {
    const rows = db.prepare('SELECT id, name, updated_at FROM datasets').all();
    res.json({ count: rows.length, datasets: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/datasets', (req, res) => {
  const { id, name, type, content, bi_config } = req.body;
  if (!id || !name || !content) {
    console.error(`[DATASET_SYNC] Validation failed for ${id || 'unknown'}. Missing name or content.`);
    return res.status(400).json({ error: 'id, name, and content are required' });
  }
  try {
    console.log(`[DATASET_SYNC] Mirroring dataset: ${id} (${name})`);
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
    const biConfigStr = bi_config ? (typeof bi_config === 'string' ? bi_config : JSON.stringify(bi_config)) : null;
    
    const stmt = db.prepare(`
      INSERT INTO datasets (id, name, type, content, bi_config, updated_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        name=excluded.name,
        type=excluded.type,
        content=excluded.content,
        bi_config=excluded.bi_config,
        updated_at=CURRENT_TIMESTAMP
    `);
    stmt.run(id, name, type || 'json', contentStr, biConfigStr);
    console.log(`[DATASET_SYNC] Success: Persisted ${id} to SQLite`);
    res.json({ success: true });
  } catch (error) {
    console.error(`[DATASET_SYNC] 500: Error persisting ${id}`, error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/datasets/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM datasets WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- API SYSTEM SETTINGS ---

app.get('/api/system-settings/:id', (req, res) => {
  const { id } = req.params;
  try {
    const setting = db.prepare('SELECT * FROM system_settings WHERE id = ?').get(id);
    // Nếu không tìm thấy, trả về null với 200 OK để tránh lỗi 404 trên console
    if (!setting) return res.json(null);
    res.json(JSON.parse(setting.config));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/system-settings', (req, res) => {
  const { id, config } = req.body;
  if (!id || !config) return res.status(400).json({ error: 'id and config are required' });
  try {
    const configStr = typeof config === 'string' ? config : JSON.stringify(config);
    const stmt = db.prepare(`
      INSERT INTO system_settings (id, config, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        config=excluded.config,
        updated_at=CURRENT_TIMESTAMP
    `);
    stmt.run(id, configStr);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- API PRIVATE PHOTOS ---

app.get('/api/private-photos', (req, res) => {
  try {
    const photos = db.prepare('SELECT * FROM private_photos ORDER BY updated_at DESC').all();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/private-photos', (req, res) => {
  const { id, name, content } = req.body;
  if (!id || !name || !content) return res.status(400).json({ error: 'id, name and content are required' });
  try {
    const stmt = db.prepare(`
      INSERT INTO private_photos (id, name, content, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        name=excluded.name,
        content=excluded.content,
        updated_at=CURRENT_TIMESTAMP
    `);
    stmt.run(id, name, content);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/private-photos/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM private_photos WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`TiniX Visualization Server running at http://localhost:${port}`);
});
