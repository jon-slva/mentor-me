import logo from './logo.svg';
import './App.css';
import Globe from 'react-globe.gl';
import map from './assets/earth-blue-marble.jpg'
import clouds from './assets/fair_clouds_4k.png'
import bump from './assets/elev_bump_4k.jpg'
import bgImage from './assets/galaxy_starfield.png'
import React from 'react';
import * as THREE from 'three';
const { useEffect, useRef } = React;

// this should be refactored

function App() {
  const World = () => {
    const globeEl = useRef();
  
    useEffect(() => {
      const globe = globeEl.current;
  
      // Auto-rotate
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.35;
  
      // Add clouds sphere
      const CLOUDS_IMG_URL = clouds;
      const CLOUDS_ALT = 0.004;
      const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame
  
      new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
        const clouds = new THREE.Mesh(
          new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
          new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
        );
        globe.scene().add(clouds);
  
        (function rotateClouds() {
          clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
          requestAnimationFrame(rotateClouds);
        })();
      });
    }, []);
  
    return <Globe
      ref={globeEl}
      animateIn={false}
      bumpImageUrl={bump}
      showAtmosphere
      backgroundImageUrl={bgImage}
      globeImageUrl={map}
    />;
  };


  return (
    <div className="App">
      {/* <h1>This is the title of the app</h1> */}
      <World />
    </div>
  );
}

export default App;
