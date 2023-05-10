import React, { useState, useEffect } from 'react';
import { cryptoIcon } from '../../assets/color';

const SvgLoader = ({ name }: { name: string }) => {
  const [svgContent, setSvgContent] = useState('');

  const getIconPath = (name: string) => {
    if (cryptoIcon.hasOwnProperty(name)) {
      return cryptoIcon[name];
    } else {
      // Loop through the keys of the object
      for (let key of Object.keys(cryptoIcon)) {
        // Check if the string includes the key
        if (key.length > 3 && name.includes(key)) {
          // Return the value associated with the matching key
          return cryptoIcon[key];
        }
      }
    }
    return '/assets/crypto/color/generic.svg';
  };

  const fetchSvg = async () => {
    let svgLink: string = getIconPath(name);
    const response = await fetch(svgLink);
    if (response.ok) {
      const svg = await response.text();
      setSvgContent(svg);
    }
  };
  useEffect(() => {
    if (name) {
      fetchSvg();
    }
  }, [name]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default SvgLoader;
