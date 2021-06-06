window.addEventListener('load', init);

      function init() {
        // サイズを指定
        const width = 1600;
        const height = 680;
        let rot = 0; // 角度

        // rendererを作成
        const renderer = new THREE.WebGLRenderer({
          canvas: document.querySelector('#myCanvas'),
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // sceneをセットする
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x0016FF, 0.00035 );//後方の物体をかすませる

        // cameraをセットする
        const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 700, 3000 );
        
        

        createStarDust();

        function createStarDust() {
          // 頂点座標を格納する配列
          const vertices = [];

          // 配置する範囲
          const size = 2500;
          // 配置する個数
          const LENGTH = 30000;
          const pointNum = 9000;
          
          //星を配置する
          for (let i = 0; i < pointNum; i++) {
            const x = size * (Math.random() - 0.5);
            const y = size * (Math.random() - 0.5);
            const z = size * (Math.random() - 0.5);

            vertices.push(x, y, z);
          }

          // 形状データを作成
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

          // materialを作成
          const material = new THREE.PointsMaterial({
            size: 4.5,
            color: 0xffffff,
          });
          

          // 物体を作成
          const mesh = new THREE.Points(geometry, material);
          scene.add(mesh);
        }

        tick();

        // 毎フレーム時に実行されるループイベント
        function tick() {
          rot += 0.07;

          // ラジアンに変換する
          const radian = (rot * Math.PI) / 180;
          // 角度に応じてカメラの位置を設定
          camera.position.x = 1000 * Math.sin(radian);
          camera.position.z = 1000 * Math.cos(radian);
          // カメラを中央に指定
          camera.lookAt(new THREE.Vector3(0, 0, 0));

          // レンダリング
          renderer.render(scene, camera);

          requestAnimationFrame(tick);
        }
      }


















// window.addEventListener("DOMContentLoaded", init);

// function init() {
//   const width = 1480;
//   const height = 680;

//   // レンダラーを作成
//   const renderer = new THREE.WebGLRenderer({
//     canvas: document.querySelector("#myCanvas")
//   });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(width, height);

//   // シーンを作成
//   const scene = new THREE.Scene();

//   // カメラを作成
//   const camera = new THREE.PerspectiveCamera(
//     45,
//     width / height,
//     1,
//     10000
//   );
//   camera.position.set(0, 0, +1000);

//   const box = new THREE.Mesh(geometry, material);
//   scene.add(box);

//   // 平行光源
//   const directionalLight = new THREE.DirectionalLight(
//     0xffffff
//   );
//   directionalLight.position.set(1, 1, 1);
//   // シーンに追加
//   scene.add(directionalLight);

//   // 初回実行
//   renderer.render(scene, camera);
// }