import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  Object3D,
  Points,
  PointsMaterial,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Texture,
  TextureLoader,
  Vector3
} from 'three'

import {
  createAnimateLine,
  createLightPillar,
  createPointMesh,
  createWaveMesh,
  getCirclePoints,
  lon2xyz
} from '../Utils/common'
import gsap from 'gsap'
import { flyArc } from '../Utils/arc'
import earthVertex from '../shaders/earth/vertex.vs?raw'
import earthFragment from '../shaders/earth/fragment.fs?raw'

export type punctuation = {
  circleColor: number
  lightColumn: {
    startColor: number // điểm bắt đầuMàu sắc
    endColor: number // kết thúcMàu sắc
  }
}

type options = {
  data: {
    startArray: {
      name: string
      E: number // kinh độ
      N: number // Kích thước
    }
    endArray: {
      name: string
      E: number // kinh độ
      N: number // Kích thước
    }[]
  }[]
  dom: HTMLElement
  textures: Record<string, Texture> // nhãn dán
  earth: {
    radius: number // Bán kính trái đất
    rotateSpeed: number // tốc độ quay trái đất
    isRotation: boolean // Nhóm Trái đất có quay không?
  }
  satellite: {
    show: boolean // Có hiển thị vệ tinh hay không
    rotateSpeed: number // Tốc độ quay
    size: number // kích thước vệ tinh
    number: number // Một chiếc nhẫn và vài quả bóng
  }
  punctuation: punctuation
  flyLine: {
    color: number // Đường bayMàu sắc
    speed: number // Tốc độ tuyến tính của đuôi máy bay
    flyLineColor: number // đường bayMàu sắc
  }
}
type uniforms = {
  glowColor: { value: Color }
  scale: { type: string; value: number }
  bias: { type: string; value: number }
  power: { type: string; value: number }
  time: { type: string; value: any }
  isHover: { value: boolean }
  map: { value?: Texture }
}

export default class earth {
  public group: Group
  public earthGroup: Group

  public around!: BufferGeometry
  public aroundPoints!: Points<BufferGeometry, PointsMaterial>

  public options: options
  public uniforms: uniforms
  public timeValue: number

  public earth!: Mesh<SphereGeometry, ShaderMaterial>
  public punctuationMaterial!: MeshBasicMaterial
  public markupPoint: Group
  public waveMeshArr: Object3D[]

  public circleLineList: any[]
  public circleList: any[]
  public x: number
  public n: number
  public isRotation: boolean
  public flyLineArcGroup!: Group

  constructor(options: options) {
    this.options = options

    this.group = new Group()
    this.group.name = 'group'
    this.group.scale.set(0, 0, 0)
    this.earthGroup = new Group()
    this.group.add(this.earthGroup)
    this.earthGroup.name = 'EarthGroup'

    // Hiệu ứng điểm nhãn
    this.markupPoint = new Group()
    this.markupPoint.name = 'markupPoint'
    this.waveMeshArr = []

    // vệ tinh và thẻ
    this.circleLineList = []
    this.circleList = []
    this.x = 0
    this.n = 0

    // vòng quay của trái đất
    this.isRotation = this.options.earth.isRotation

    // quétAnimation shader
    this.timeValue = 200

    this.uniforms = {
      glowColor: {
        value: new Color(0x0cd1eb)
      },
      scale: {
        type: 'f',
        value: -1.0
      },
      bias: {
        type: 'f',
        value: 1.0
      },
      power: {
        type: 'f',
        value: 3.3
      },
      time: {
        type: 'f',
        value: this.timeValue
      },
      isHover: {
        value: false
      },
      map: {
        value: undefined
      }
    }
  }

  async init(): Promise<void> {
    return new Promise(resolve => {
      const init = async () => {
        this.createEarth() // tạo ra trái đất
        this.createEarthGlow() // Tạo ánh sáng trái đất
        this.createEarthAperture() // Tạo bầu khí quyển của Trái đất
        await this.createMarkupPoint() // Tạo điểm cột
        this.createAnimateCircle() // Tạo một vệ tinh quay quanh
        this.createFlyLine() // Tạo đường bay
        this.show()
        resolve()
      }
      init()
    })
  }

  createEarth() {
    const earth_geometry = new SphereGeometry(this.options.earth.radius, 50, 50)
    const earth_border = new SphereGeometry(this.options.earth.radius + 10, 60, 60)

    const pointMaterial = new PointsMaterial({
      color: 0x81ffff, //Cài Đặt ChỉnhMàu sắc,mặc định 0xFFFFFF
      transparent: true,
      sizeAttenuation: true,
      opacity: 0.1,
      vertexColors: false, //Xác định liệu vật liệu có sử dụng các đỉnh hay khôngMàu sắc,mặc địnhfalse ---Nếu tùy chọn nàyCài Đặt Chỉnhvìtrue,NhưngcolorThuộc tính không hợp lệ
      size: 0.2 //Xác định kích thước của các hạt.Mặc định là1.0
    })
    const points = new Points(earth_border, pointMaterial) //SẽBiểu mẫu ModelThêmđến hiện trường

    this.earthGroup.add(points)

    this.uniforms.map.value = this.options.textures.earth

    const earth_material = new ShaderMaterial({
      // wireframe:true, // trình diễnBiểu mẫu Modelđường kẻ
      uniforms: this.uniforms as any,
      vertexShader: earthVertex,
      fragmentShader: earthFragment
    })

    earth_material.needsUpdate = true
    this.earth = new Mesh(earth_geometry, earth_material)
    this.earth.name = 'earth'
    this.earthGroup.add(this.earth)
  }

  createEarthGlow() {
    const R = this.options.earth.radius //Bán kính trái đất

    // TextureLoaderTạo một đối tượng tải kết cấu có thể tải hình ảnh dưới dạng bản đồ kết cấu
    const texture = this.options.textures.glow // Tải bản đồ kết cấu

    // Tạo một đối tượng vật liệu spriteSpriteMaterial
    const spriteMaterial = new SpriteMaterial({
      map: texture, // Cài Đặt ChỉnhBản đồ kết cấu Sprite
      color: 0x4390d1,
      transparent: true, //Bậttrong suốt
      opacity: 0.7, // Có thể được truy cập thông qua Độ mờ đụcĐiều chỉnh tổng thể khẩu độ
      depthWrite: false //Vô hiệu hóa ghi vào bộ đệm sâuDữ liệu
    })

    // Tạo một sprite đại diện cho khẩu độ của Trái đấtBiểu mẫu Model
    const sprite = new Sprite(spriteMaterial)
    sprite.scale.set(R * 3.0, R * 3.0, 1) //Chia tỷ lệ các họa tiết một cách thích hợp
    this.earthGroup.add(sprite)
  }

  createEarthAperture() {
    const vertexShader = [
      'varying vec3	vVertexWorldPosition;',
      'varying vec3	vVertexNormal;',
      'varying vec4	vFragColor;',
      'void main(){',
      '	vVertexNormal	= normalize(normalMatrix * normal);', //Chuyển đổi pháp tuyến thành hệ tọa độ xem
      '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;', //Chuyển đổi các đỉnh thành hệ tọa độ thế giới
      '	// set gl_Position',
      '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      '}'
    ].join('\n')

    //Hiệu ứng khí quyển
    const AeroSphere = {
      uniforms: {
        coeficient: {
          type: 'f',
          value: 1.0
        },
        power: {
          type: 'f',
          value: 3
        },
        glowColor: {
          type: 'c',
          value: new Color(0x4390d1)
        }
      },
      vertexShader: vertexShader,
      fragmentShader: [
        'uniform vec3	glowColor;',
        'uniform float	coeficient;',
        'uniform float	power;',

        'varying vec3	vVertexNormal;',
        'varying vec3	vVertexWorldPosition;',

        'varying vec4	vFragColor;',

        'void main(){',
        '	vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;', //Từ camera trong hệ tọa độ thế giớiVị trí lên đỉnhVị trí khoảng cách
        '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;', //từ camera trong hệ tọa độ xemVị trí lên đỉnhVị trí khoảng cách
        '	viewCameraToVertex= normalize(viewCameraToVertex);', //bình thường hóa
        '	float intensity	= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
        '	gl_FragColor = vec4(glowColor, intensity);',
        '}'
      ].join('\n')
    }
    //quả cầu ánh sáng bầu không khí
    const material1 = new ShaderMaterial({
      uniforms: AeroSphere.uniforms,
      vertexShader: AeroSphere.vertexShader,
      fragmentShader: AeroSphere.fragmentShader,
      blending: NormalBlending,
      transparent: true,
      depthWrite: false
    })
    const sphere = new SphereGeometry(this.options.earth.radius + 0, 50, 50)
    const mesh = new Mesh(sphere, material1)
    this.earthGroup.add(mesh)
  }

  async createMarkupPoint() {
    await Promise.all(
      this.options.data.map(async item => {
        const radius = this.options.earth.radius
        const lon = item.startArray.E //kinh độ
        const lat = item.startArray.N //vĩ độ

        this.punctuationMaterial = new MeshBasicMaterial({
          color: this.options.punctuation.circleColor,
          map: this.options.textures.label,
          transparent: true, //sử dụngBackgroundtrong suốtpngnhãn dán, chú ýBậtĐiện toán minh bạch
          depthWrite: false //Vô hiệu hóa ghi vào bộ đệm sâuDữ liệu
        })

        const mesh = createPointMesh({ radius, lon, lat, material: this.punctuationMaterial }) //Mặt phẳng hình chữ nhật chân cột đèn
        this.markupPoint.add(mesh)
        const LightPillar = createLightPillar({
          radius: this.options.earth.radius,
          lon,
          lat,
          index: 0,
          textures: this.options.textures,
          punctuation: this.options.punctuation
        }) //chùm ánh sáng
        this.markupPoint.add(LightPillar)
        const WaveMesh = createWaveMesh({ radius, lon, lat, textures: this.options.textures }) //Khẩu độ dao động
        this.markupPoint.add(WaveMesh)
        this.waveMeshArr.push(WaveMesh)

        await Promise.all(
          item.endArray.map(obj => {
            const lon = obj.E //kinh độ
            const lat = obj.N //vĩ độ
            const mesh = createPointMesh({ radius, lon, lat, material: this.punctuationMaterial }) //Mặt phẳng hình chữ nhật chân cột đèn
            this.markupPoint.add(mesh)
            const LightPillar = createLightPillar({
              radius: this.options.earth.radius,
              lon,
              lat,
              index: 1,
              textures: this.options.textures,
              punctuation: this.options.punctuation
            }) //chùm ánh sáng
            this.markupPoint.add(LightPillar)
            const WaveMesh = createWaveMesh({ radius, lon, lat, textures: this.options.textures }) //Khẩu độ dao động
            this.markupPoint.add(WaveMesh)
            this.waveMeshArr.push(WaveMesh)
          })
        )
        this.earthGroup.add(this.markupPoint)
      })
    )
  }

  createAnimateCircle() {
    // tạo nên nhẫn điểm
    const list = getCirclePoints({
      radius: this.options.earth.radius + 15,
      number: 150, //Số lần cắt
      closed: true // đóng cửa
    })
    const mat = new MeshBasicMaterial({
      color: '#0c3172',
      transparent: true,
      opacity: 0.4,
      side: DoubleSide
    })
    const line = createAnimateLine({
      pointList: list,
      material: mat,
      number: 100,
      radius: 0.1
    })
    this.earthGroup.add(line)

    // hiện hữucloneHai dòng đi ra
    const l2 = line.clone()
    l2.scale.set(1.2, 1.2, 1.2)
    l2.rotateZ(Math.PI / 6)
    this.earthGroup.add(l2)

    const l3 = line.clone()
    l3.scale.set(0.8, 0.8, 0.8)
    l3.rotateZ(-Math.PI / 6)
    this.earthGroup.add(l3)

    /**
     * bóng quay
     */
    const ball = new Mesh(
      new SphereGeometry(this.options.satellite.size, 32, 32),
      new MeshBasicMaterial({
        color: '#e0b187' // 745F4D
      })
    )

    const ball2 = new Mesh(
      new SphereGeometry(this.options.satellite.size, 32, 32),
      new MeshBasicMaterial({
        color: '#628fbb' // 324A62
      })
    )

    const ball3 = new Mesh(
      new SphereGeometry(this.options.satellite.size, 32, 32),
      new MeshBasicMaterial({
        color: '#806bdf' //6D5AC4
      })
    )

    this.circleLineList.push(line, l2, l3)
    ball.name = ball2.name = ball3.name = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_514') : 'vệ tinh')

    for (let i = 0; i < this.options.satellite.number; i++) {
      const ball01 = ball.clone()
      // một sợi chỉTrênCó tổng cộng bao nhiêu quả bóng, tính trung bình theo số lượngPhútLàm một miếng vải
      const num = Math.floor(list.length / this.options.satellite.number)
      ball01.position.set(list[num * (i + 1)][0] * 1, list[num * (i + 1)][1] * 1, list[num * (i + 1)][2] * 1)
      line.add(ball01)

      const ball02 = ball2.clone()
      const num02 = Math.floor(list.length / this.options.satellite.number)
      ball02.position.set(list[num02 * (i + 1)][0] * 1, list[num02 * (i + 1)][1] * 1, list[num02 * (i + 1)][2] * 1)
      l2.add(ball02)

      const ball03 = ball2.clone()
      const num03 = Math.floor(list.length / this.options.satellite.number)
      ball03.position.set(list[num03 * (i + 1)][0] * 1, list[num03 * (i + 1)][1] * 1, list[num03 * (i + 1)][2] * 1)
      l3.add(ball03)
    }
  }

  createFlyLine() {
    this.flyLineArcGroup = new Group()
    this.flyLineArcGroup.userData['flyLineArray'] = []
    this.earthGroup.add(this.flyLineArcGroup)
    this.options.data.forEach(cities => {
      cities.endArray.forEach(item => {
        // chức năng gọiflyArcVẽ một hình cầuTrênQuỹ đạo vòng cung đường bay giữa hai điểm bất kỳ
        const arcline = flyArc(
          this.options.earth.radius,
          cities.startArray.E,
          cities.startArray.N,
          item.E,
          item.N,
          this.options.flyLine
        )

        this.flyLineArcGroup.add(arcline) // Chèn chì bayflyArcGroupở giữa
        this.flyLineArcGroup.userData['flyLineArray'].push(arcline.userData['flyLine'])
      })
    })
  }

  show() {
    gsap.to(this.group.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2,
      ease: 'Quadratic'
    })
  }

  render() {
    this.flyLineArcGroup?.userData['flyLineArray']?.forEach((fly: any) => {
      fly.rotation.z += this.options.flyLine.speed // Điều chỉnh tốc độ đường bay
      if (fly.rotation.z >= fly.flyEndAngle) fly.rotation.z = 0
    })

    if (this.isRotation) {
      this.earthGroup.rotation.y += this.options.earth.rotateSpeed
    }

    this.circleLineList.forEach(e => {
      e.rotateY(this.options.satellite.rotateSpeed)
    })

    this.uniforms.time.value =
      this.uniforms.time.value < -this.timeValue ? this.timeValue : this.uniforms.time.value - 1

    if (this.waveMeshArr.length) {
      this.waveMeshArr.forEach((mesh: any) => {
        mesh.userData['scale'] += 0.007
        mesh.scale.set(
          mesh.userData['size'] * mesh.userData['scale'],
          mesh.userData['size'] * mesh.userData['scale'],
          mesh.userData['size'] * mesh.userData['scale']
        )
        if (mesh.userData['scale'] <= 1.5) {
          (mesh.material as Material).opacity = (mesh.userData['scale'] - 1) * 2 //2bình đẳng1/(1.5-1.0), Độ đảm bảo mờ đụchiện hữu0~1thay đổi giữa
        } else if (mesh.userData['scale'] > 1.5 && mesh.userData['scale'] <= 2) {
          (mesh.material as Material).opacity = 1 - (mesh.userData['scale'] - 1.5) * 2 //2bình đẳng1/(2.0-1.5) meshPhóng2Lần tương ứng0 Phóng1.5tương ứng1
        } else {
          mesh.userData['scale'] = 1
        }
      })
    }
  }
}
