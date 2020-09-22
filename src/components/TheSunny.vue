<template>
  <div id=sunny></div>
</template>

<script>
import * as THREE from 'three'

export default {
  mounted: function () {
    const container = document.getElementById('sunny')
    const style = getComputedStyle(document.body);

    const h = window.innerHeight / 2
    const w = window.innerWidth
    const aspect = w / h

    const base_string = style.getPropertyValue('--white-color')
    const base = base_string.split(',').map(c => parseInt(c) / 100) 
    const baseColor = new THREE.Color().setHSL(...base)

    const gray_string = style.getPropertyValue('--gray80-color')
    const gray = gray_string.split(',').map(c => parseInt(c) / 100)
    const grayColor = new THREE.Color().setHSL(...gray)

    const primary_string = style.getPropertyValue('--primary-color')
    const primary = primary_string.split(',').map(c => parseInt(c) / 255)
    const primaryColor = new THREE.Color(...primary)

    var renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(window.devicePixelRatio);
    
    container.appendChild( renderer.domElement );

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
    scene.add( new THREE.AmbientLight( 0x443333 ) );

    var light = new THREE.DirectionalLight( baseColor, 0.55 );
    light.position.set( -0.5, 4, -0.5 ).multiplyScalar(10);
    light.castShadow = false
    light.shadow.camera.near = 0;
    light.shadow.camera.far = 1000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add( light );

    light = new THREE.DirectionalLight( baseColor, 0.6 );
    light.position.set( 1, 0.5, 0.5 ).normalize().multiplyScalar(10);
    light.castShadow = true
    light.shadow.camera.near = 0;
    light.shadow.camera.far = 1000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add( light );

    var planeGeometry = new THREE.PlaneBufferGeometry( 100, 100, 2, 2 );
    var planeMaterial = new THREE.MeshPhongMaterial( {color: baseColor, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.x = 0
    plane.position.y = -2.
    plane.position.z = -4
    plane.rotation.x = 0.5 * Math.PI
    plane.receiveShadow = true
    scene.add( plane );

    const sunnyMesh = new THREE.SphereBufferGeometry(1, 25, 25)
    const sunnyMaterial = new THREE.MeshPhongMaterial( {color: grayColor})

    const sunny = new THREE.Mesh(sunnyMesh, sunnyMaterial)
    sunny.castShadow = true
    sunnyMaterial.emissive = baseColor.multiplyScalar(0.3)
    sunnyMaterial.specular = baseColor.multiplyScalar(0.15)
    sunny.position.set(0, 0, 0)


    const planyMesh = new THREE.SphereBufferGeometry(0.25, 25, 25)
    const planyMaterial = new THREE.MeshPhongMaterial( {color: primaryColor})

    const plany = new THREE.Mesh(planyMesh, planyMaterial)
    plany.castShadow = true

    plany.position.set(4, 0, 0)


    const system = new THREE.Group()

    system.add(sunny)
    system.add(plany)

    scene.add(system)

    
    camera.position.x = 4;
    camera.position.y = 3;
    camera.position.z = 12;
    // 
    camera.rotation.x = -0.15;
    // camera.rotation.y += 0.5;
    // camera.rotation.z = 0;
    
    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth, window.innerHeight);
    }
    
    const t0 = Date.now()
    var t = 0

    var animate = function () {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );

      // const factor = Math.pow(Math.sin(0.001 * t), 2)
      system.rotation.y = amplitude(t)

      t = t0 - Date.now()
    };


    function amplitude(t) {
      return 2 * Math.PI * 0.0001 * t
    }
    
    function onScroll(event) {
      event.preventDefault()

    }
    
    window.addEventListener('scroll', onScroll, false);

    animate()
  }
}
</script>
