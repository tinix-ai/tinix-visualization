/**
 * Quản lý và tải tài nguyên
 */
import { LoadingManager, Texture, TextureLoader } from 'three'
import { loadingStart, loadingFinish, loadingError } from '@/utils'
import { resources } from './Assets'
export class Resources {
  private manager!: LoadingManager
  private callback: () => void
  private textureLoader!: InstanceType<typeof TextureLoader>
  public textures: Record<string, Texture>
  constructor(callback: () => void) {
    this.callback = callback // Gọi lại khi tải tài nguyên hoàn tất
    this.textures = {} // đối tượng kết cấu
    this.setLoadingManager()
    this.loadResources()
  }

  /**
   * Quản lý trạng thái tải
   */
  private setLoadingManager() {
    this.manager = new LoadingManager()
    // Bắt đầu tải
    this.manager.onStart = () => {
      loadingStart()
    }
    // Đang tải hoàn tất
    this.manager.onLoad = () => {
      this.callback()
    }
    // đang tiến hành
    this.manager.onProgress = url => {
      loadingFinish()
    }

    this.manager.onError = url => {
      loadingError()
      window['$message'].error((typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_425') : 'Tải dữ liệu không thành công, vui lòng làm mới và thử lại!'))
    }
  }

  /**
   * Tải tài nguyên
   */
  private loadResources(): void {
    this.textureLoader = new TextureLoader(this.manager)
    resources.textures?.forEach(item => {
      this.textureLoader.load(item.url, t => {
        this.textures[item.name] = t
      })
    })
  }
}
