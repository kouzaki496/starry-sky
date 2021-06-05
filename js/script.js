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
        scene.fog = new THREE.FogExp2( 0x0000FF, 0.0003 );//後方の物体をぼかす

        // cameraをセットする
        const camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 700, 3000 );
        
        

        createStarDust();

        function createStarDust() {
          // 頂点座標を格納する配列
          const vertices = [];

          // 配置する範囲
          const SIZE = 6000;
          // 配置する個数
          const LENGTH = 30000;
          
          //星を配置する
          for (let i = 0; i < LENGTH; i++) {
            const x = SIZE * (Math.random() - 0.5);
            const y = SIZE * (Math.random() - 0.5);
            const z = SIZE * (Math.random() - 0.5);

            vertices.push(x, y, z);
          }

          // 形状データを作成
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

          // materialを作成
          const material = new THREE.PointsMaterial({
            size: 6,
            color: 0xffffff,
          });

          // 物体を作成
          const mesh = new THREE.Points(geometry, material);
          scene.add(mesh);
        }

        tick();

        // 毎フレーム時に実行されるループイベント
        function tick() {
          rot += 1;

          // ラジアンに変換する
          const radian = (rot * Math.PI) / 180;
          // 角度に応じてカメラの位置を設定
          camera.position.x = 1000 * Math.sin(radian);
          camera.position.z = 1000 * Math.cos(radian);
          // 原点方向を見つめる
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