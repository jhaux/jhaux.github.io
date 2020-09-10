<template>
    <div id="impactor_container" class=impactor>
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  mounted: function () {
    // this.height = this.$parent.$el.offsetHeight

    const container = document.getElementById('impactor_container')
    const style = getComputedStyle(document.body);

    const h = window.innerHeight
    const w = window.innerWidth
    const aspect = w / h

    const base_string = style.getPropertyValue('--white-color')
    console.log(base_string)
    const base = base_string.split(',').map(c => parseInt(c) / 100) 
    const baseColor = new THREE.Color().setHSL(...base)

    const gray_string = style.getPropertyValue('--gray80-color')
    const gray = gray_string.split(',').map(c => parseInt(c) / 100)
    const grayColor = new THREE.Color().setHSL(...gray)

    const primary_string = style.getPropertyValue('--primary-color')
    const primary = primary_string.split(',').map(c => parseInt(c) / 255)
    const primaryColor = new THREE.Color(...primary)

    console.log(baseColor, grayColor, primaryColor)
    
    var renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(window.devicePixelRatio);
    
    container.appendChild( renderer.domElement );

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
    scene.add( new THREE.AmbientLight( 0x443333 ) );

    var redLight = new THREE.PointLight( primaryColor, 1 );
    redLight.position.set(0, 0.5, 0)
    redLight.castShadow = true
    scene.add( redLight );

    var light = new THREE.DirectionalLight( baseColor, 0.8 );
    light.position.set( 1, 0.75, 0.5 ).multiplyScalar(10);
    light.castShadow = false
    light.shadow.camera.near = 0;
    light.shadow.camera.far = 1000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add( light );

    light = new THREE.DirectionalLight( baseColor, 1 );
    light.position.set( - 1, 0.75, - 0.5 ).normalize().multiplyScalar(10);
    light.castShadow = true
    light.shadow.camera.near = 0;
    light.shadow.camera.far = 1000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add( light );

    var planeGeometry = new THREE.PlaneBufferGeometry( 100, 100, 32, 32 );
    var planeMaterial = new THREE.MeshPhongMaterial( {color: baseColor, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.x = 0
    plane.position.y = 0.
    plane.position.z = -30
    plane.rotation.x = 0.5 * Math.PI
    plane.receiveShadow = true
    scene.add( plane );
    
    const N = 3
    const cubes = new THREE.Group()
    const iterCubes = []
    const maxR = Math.pow((N*2 + 1) / 2, 2)
    const redMaterial = new THREE.MeshPhongMaterial( { color: primaryColor } );
    console.log(redMaterial)
    let material
    for (var i = -N; i < N + 1; i++) {
        for (var j = -N; j < N+1; j++) {
          var radialOffset = i*i + j*j
          if ( radialOffset < maxR ) {
            var geometry = new THREE.BoxBufferGeometry();
            if ( i == 0 && j == 0 ) {
                material = redMaterial
            } else {
                material = new THREE.MeshPhongMaterial( { color: grayColor } );
            }
            var cube = new THREE.Mesh( geometry, material );
            cube.position.x = j
            cube.position.z = i
            cube.position.y = 0
            cube.scale.x = 0.75
            cube.scale.z = 0.75
            cube.scale.y = 0.25
            cube.castShadow = true
            cube.receiveShadow = true

            cubes.add( cube );
            iterCubes.push(cube)
          }
        }
    }

    scene.add(cubes)
    
    camera.position.x = 3;
    camera.position.y = 4;
    camera.position.z = 9;
    
    camera.rotation.x = -0.5;
    camera.rotation.y += 0.5;
    camera.rotation.z = 0;
    
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

      const factor = Math.pow(Math.sin(0.001 * t), 2)
      redLight.intensity = factor
      const emission = factor
      redMaterial.emissive.setRGB(
        emission * primaryColor.r,
        emission * primaryColor.g,
        emission * primaryColor.b
      )

      t = t0 - Date.now()
    };


    function amplitude(t) {
      return 0.25 + Math.pow( Math.sin(10 * t), 2)
    }
    
    function onScroll(event) {
      event.preventDefault()
    
      const scrollY = window.scrollY  / h

      for (var i = 0; i < iterCubes.length; i++) {
        var cube = iterCubes[i]

        const x = cube.position.x
        const y = cube.position.z
        const phase = x*x + y*y
        const t = Math.max(0, scrollY - 0.01*phase)
        cube.scale.y = amplitude(t)
      }
    }
    
    window.addEventListener('scroll', onScroll, false);

    animate()
  }
}
</script>

<style scoped>

.impactor {
  z-index: -100;
}

</style>
