import { MeshBasicMaterial, PerspectiveCamera, Scene, ShaderMaterial, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// interfaces
import { IWord } from '../interfaces/IWord'
import { Basic } from './Basic'
import { Resources } from './Resources'
// earth
import Earth from './Earth'

export default class World {
  public basic: Basic
  public scene: Scene
  public camera: PerspectiveCamera
  public renderer: WebGLRenderer
  public controls: OrbitControls
  public material!: ShaderMaterial | MeshBasicMaterial
  public resources: Resources
  public option: IWord
  public earth!: Earth

  constructor(option: IWord) {
    /**
     * Tải tài nguyên
     */
    this.option = option
    this.basic = new Basic(option.dom)
    this.scene = this.basic.scene
    this.renderer = this.basic.renderer
    this.controls = this.basic.controls
    this.camera = this.basic.camera
    this.updateSize()
    this.resources = new Resources(async () => {
      await this.createEarth()
      // Bắt đầu kết xuất
      this.render()
    })
  }

  async createEarth(data?: any) {
    // Các nguồn tài nguyên được nạp và trái đất được tạo ra. Bình luận đang ở trongnew Earth()loại bên trong
    this.earth = new Earth({
      data: data || this.option.data,
      dom: this.option.dom,
      textures: this.resources.textures,
      earth: {
        radius: 50,
        rotateSpeed: 0.002,
        isRotation: true
      },
      satellite: {
        show: true,
        rotateSpeed: -0.01,
        size: 1,
        number: 2
      },
      punctuation: {
        circleColor: 0x3892ff,
        lightColumn: {
          startColor: 0xe4007f, // điểm bắt đầuMàu sắc
          endColor: 0xffffff // kết thúcMàu sắc
        }
      },
      flyLine: {
        color: 0xf3ae76, // Đường bayMàu sắc
        flyLineColor: 0xff7714, // đường bayMàu sắc
        speed: 0.004 // Tốc độ của đường bay kéo theo
      }
    })

    this.scene.add(this.earth.group)
    await this.earth.init()
  }

  /**
   * chức năng kết xuất
   */
  public render() {
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
    this.controls && this.controls.update()
    this.earth && this.earth.render()
  }

  // gia hạn
  public updateSize(width?: number, height?: number) {
    let w = width || this.option.width
    let h = height || this.option.height
    // Lấy giá trị nhỏ
    if (w < h) h = w
    else w = h

    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  // Dữ liệuCập nhật kết xuất lại
  public updateData(data?: any) {
    if (!this.earth.group) return
    // Xóa cái cũ trước đi
    this.scene.remove(this.earth.group)
    // đệ quyVòng lặpNhóm đối tượnggroupGiải phóng tất cả các mắt lưới con cháuBiểu mẫu ModelHình học giới hạn chiếm bộ nhớ
    this.earth.group.traverse((obj: any) => {
      if (obj.type === 'Mesh') {
        obj.geometry.dispose()
        obj.material.dispose()
      }
    })
    // Tạo lại
    this.createEarth(data)
  }
}
