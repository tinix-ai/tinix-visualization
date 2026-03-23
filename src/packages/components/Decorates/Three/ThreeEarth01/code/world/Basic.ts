/**
 * tạo nên threejs Tứ Thiên Vương
 * Cảnh, máy ảnh, trình kết xuất, bộ điều khiển
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Basic {
  public scene!: THREE.Scene
  public camera!: THREE.PerspectiveCamera
  public renderer!: THREE.WebGLRenderer
  public controls!: OrbitControls
  public dom: HTMLElement

  constructor(dom: HTMLElement) {
    this.dom = dom
    this.initScenes()
    this.setControls()
  }

  /**
   * Cảnh khởi tạo
   */
  initScenes() {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000)
    this.camera.position.set(0, 30, -250)

    this.renderer = new THREE.WebGLRenderer({
      // canvas: this.dom,
      alpha: true, // trong suốt
      antialias: true, // Khử răng cưa
      preserveDrawingBuffer: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio) // Cài Đặt ChỉnhTỷ lệ pixel màn hình
    this.renderer.setSize(window.innerWidth, window.innerHeight) // Cài Đặt ChỉnhChiều rộng và chiều cao của trình kết xuất
    this.dom.appendChild(this.renderer.domElement) // Thêmđếndomở giữa
  }

  /**
   * Cài Đặt Chỉnhbộ điều khiển
   */
  setControls() {
    // Điều khiển chuột      máy ảnh, kết xuấtdom
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.controls.autoRotateSpeed = 3
    // làmAnimationTái chếGiờGiảm chấn hoặc xoay Có nghĩa là có quán tính?
    this.controls.enableDamping = true
    // Dynamic (Động)Hệ số giảm chấn Đó là độ nhạy xoay khi kéo chuột.
    this.controls.dampingFactor = 0.05
    // Có thể phóng to được không
    this.controls.enableZoom = true
    // Cài Đặt ChỉnhKhoảng cách xa nhất của camera so với điểm gốc
    this.controls.minDistance = 100
    // Cài Đặt ChỉnhKhoảng cách xa nhất của camera so với điểm gốc
    this.controls.maxDistance = 300
    // liệuBậtNhấp chuột phải và kéo
    this.controls.enablePan = false
  }
}
