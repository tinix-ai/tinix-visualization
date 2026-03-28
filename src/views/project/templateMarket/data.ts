import { ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'

// Import all configurations
import tpl001Config from './templates/tpl-001/config.json'
import tpl002Config from './templates/tpl-002/config.json'
import tpl003Config from './templates/tpl-003/config.json'
import tpl004Config from './templates/tpl-004/config.json'
import tpl005Config from './templates/tpl-005/config.json'
import tpl006Config from './templates/tpl-006/config.json'
import tpl007Config from './templates/tpl-007/config.json'
import tpl008Config from './templates/tpl-008/config.json'
import tpl009Config from './templates/tpl-009/config.json'
import tpl010Config from './templates/tpl-010/config.json'
import tpl011Config from './templates/tpl-011/config.json'
import tpl012Config from './templates/tpl-012/config.json'

// Import all images
import tpl001Image from './templates/tpl-001/image.png'
import tpl002Image from './templates/tpl-002/image.png'
import tpl003Image from './templates/tpl-003/moke.png'
import tpl004Image from './templates/tpl-004/image.png'
import tpl005Image from './templates/tpl-005/image.png'
import tpl006Image from './templates/tpl-006/image.png'
import tpl007Image from './templates/tpl-007/image.png'
import tpl008Image from './templates/tpl-008/image.png'
import tpl009Image from './templates/tpl-009/image.png'
import tpl010Image from './templates/tpl-010/image.png'
import tpl011Image from './templates/tpl-011/image.png'
import tpl012Image from './templates/tpl-012/image.png'

export interface TemplateItem {
  id: string
  title: string
  image: any // URL from import
  isPublished: boolean
  config?: any
}

export const templateList: TemplateItem[] = [
  {
    id: 'tpl-001',
    title: 'Báo cáo Phân tích Tài chính 2024',
    image: tpl001Image,
    isPublished: true,
    config: tpl001Config
  },
  {
    id: 'tpl-002',
    title: 'Dashboard Quản lý Nhân sự',
    image: tpl002Image,
    isPublished: false,
    config: tpl002Config
  },
  {
    id: 'tpl-003',
    title: 'Báo cáo Phân tích Doanh thu 2024',
    image: tpl003Image,
    isPublished: true,
    config: tpl003Config
  },
  {
    id: 'tpl-004',
    title: 'Theo dõi Logistic & Vận tải',
    image: tpl004Image,
    isPublished: false,
    config: tpl004Config
  },
  {
    id: 'tpl-005',
    title: 'Dashboard Y tế & Sức khỏe',
    image: tpl005Image,
    isPublished: false,
    config: tpl005Config
  },
  {
    id: 'tpl-006',
    title: 'Phân tích Dữ liệu Năng lượng',
    image: tpl006Image,
    isPublished: true,
    config: tpl006Config
  },
  {
    id: 'tpl-007',
    title: 'Báo cáo Bán lẻ Thương mại Điện tử',
    image: tpl007Image,
    isPublished: false,
    config: tpl007Config
  },
  {
    id: 'tpl-008',
    title: 'Dashboard Giám sát Môi trường',
    image: tpl008Image,
    isPublished: true,
    config: tpl008Config
  },
  {
    id: 'tpl-009',
    title: 'Phân tích Chiến dịch Marketing',
    image: tpl009Image,
    isPublished: true,
    config: tpl009Config
  },
  {
    id: 'tpl-010',
    title: 'Dashboard Quản lý Kho bãi',
    image: tpl010Image,
    isPublished: false,
    config: tpl010Config
  },
  {
    id: 'tpl-011',
    title: 'Báo cáo Tài chính Quý 2',
    image: tpl011Image,
    isPublished: true,
    config: tpl011Config
  },
  {
    id: 'tpl-012',
    title: 'Dashboard Smarthome',
    image: tpl012Image,
    isPublished: false,
    config: tpl012Config
  }
]
