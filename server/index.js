const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const { analyzeDatasetSchema, suggestCharts } = require('./ai.service');

const app = express();
const port = process.env.PORT || 3000;

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
    const existing = db.prepare('SELECT id FROM projects WHERE id = ?').get(id);
    const configStr = JSON.stringify({ ...config, id });

    if (existing) {
      db.prepare('UPDATE projects SET config = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(configStr, id);
    } else {
      db.prepare('INSERT INTO projects (id, config) VALUES (?, ?)').run(id, configStr);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xóa dự án
app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
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

app.post('/api/datasets', (req, res) => {
  const { id, name, type, content, bi_config } = req.body;
  if (!id || !name || !content) {
    return res.status(400).json({ error: 'id, name, and content are required' });
  }
  try {
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
    res.json({ success: true });
  } catch (error) {
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

app.listen(port, '0.0.0.0', () => {
  console.log(`TiniX Visualization Server running at http://localhost:${port}`);
});
