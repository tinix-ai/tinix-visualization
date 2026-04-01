const fs = require('fs');
const path = require('path');

// Try to load better-sqlite3 for DB migration
let Database;
try {
  Database = require('better-sqlite3');
} catch (e) {
  console.warn("better-sqlite3 not found. Skipping database migration.");
}

const templatesDir = path.join(__dirname, '../src/views/project/templateMarket/templates');
const dbPath = path.join(__dirname, '../server/database.sqlite');

// Load the unified world map data
const worldMapData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/packages/components/Charts/Maps/MapBase/data.json'), 'utf8'));

/**
 * Recursively flattens ECharts label/itemStyle options
 */
function fixLegacyHierarchy(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  for (const key in obj) {
    // 1. Fix normal hierarchy
    if (key === 'label' || key === 'itemStyle' || key === 'lineStyle' || key === 'areaStyle') {
      const val = obj[key];
      if (val && val.normal) {
        console.log(`    Flattening 'normal' in ${key}`);
        const normalVal = val.normal;
        delete val.normal;
        Object.assign(val, normalVal);
      }
      // 2. Fix textStyle hierarchy in label
      if (key === 'label' && val && val.textStyle) {
        console.log(`    Flattening 'textStyle' in label`);
        const textStyleVal = val.textStyle;
        delete val.textStyle;
        Object.assign(val, textStyleVal);
      }
    }
    
    // 3. Fix alignTicks readability
    if (key === 'yAxis' || key === 'xAxis') {
        const axis = obj[key];
        const axes = Array.isArray(axis) ? axis : [axis];
        axes.forEach(a => {
            if (a && a.alignTicks === true) {
                console.log(`    Disabling alignTicks: true for readability`);
                a.alignTicks = false; 
            }
        });
    }

    // 4. Fix hardcoded maps and world data
    if (key === 'mapRegion') {
        if (obj[key].adcode === 'china') {
            console.log(`    Updating mapRegion adcode from 'china' to 'world'`);
            obj[key].adcode = 'world';
        }
    }
    if (key === 'geo') {
        if (obj[key].map === 'china') {
            console.log(`    Updating geo map from 'china' to 'world'`);
            obj[key].map = 'world';
        }
    }
    if (key === 'chartConfig' && obj[key].key === 'MapBase') {
        // Find the adjacent 'option' block
        if (obj.option) {
            console.log(`    Injecting World/Hanoi data into MapBase`);
            obj.option.dataset = worldMapData;
        }
    }
    if (key === 'series' && Array.isArray(obj[key])) {
        obj[key].forEach(s => {
            if (s.type === 'map' && s.map === 'china') {
                console.log(`    Updating series map from 'china' to 'world'`);
                s.map = 'world';
            }
        });
    }

    fixLegacyHierarchy(obj[key]);
  }
  return obj;
}

// 1. Process Templates (Filesystem)
console.log("--- Processing Templates (Filesystem) ---");
if (fs.existsSync(templatesDir)) {
    const tplFolders = fs.readdirSync(templatesDir).filter(f => f.startsWith('tpl-'));
    tplFolders.forEach(folder => {
      const configPath = path.join(templatesDir, folder, 'config.json');
      if (fs.existsSync(configPath)) {
        try {
          const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
          const fixedConfig = fixLegacyHierarchy(config);
          fs.writeFileSync(configPath, JSON.stringify(fixedConfig, null, 2));
        } catch (e) {
          console.error(`  Error processing template ${folder}:`, e);
        }
      }
    });
}

// 2. Process Database (SQLite)
if (Database && fs.existsSync(dbPath)) {
    console.log("\n--- Processing Database (SQLite) ---");
    const db = new Database(dbPath);
    
    const tables = ['projects', 'system_templates', 'user_templates'];
    tables.forEach(table => {
        console.log(`  Cleaning table: ${table}`);
        const rows = db.prepare(`SELECT id, config FROM ${table}`).all();
        
        const updateStmt = db.prepare(`UPDATE ${table} SET config = ? WHERE id = ?`);
        
        rows.forEach(row => {
            try {
                const config = JSON.parse(row.config);
                const fixedConfig = fixLegacyHierarchy(config);
                const configStr = JSON.stringify(fixedConfig);
                
                if (configStr !== row.config) {
                    console.log(`    Updated record ${row.id}`);
                    updateStmt.run(configStr, row.id);
                }
            } catch (e) {
                console.error(`    Error processing record ${row.id} in ${table}:`, e);
            }
        });
    });
    
    db.close();
}

console.log("\nAll fixes applied successfully.");
