import React, { useMemo } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import HeyDayIcon from "./HeyDayIcon.js";

const { width, height } = Dimensions.get("window");

type FlowerBackgroundProps = {
  count?: number; // number of flowers
};

export default function FlowerBackground({ count = 5 }: FlowerBackgroundProps) {
  const flowers = useMemo(() => {
    const flowerSize = 80;
    const minDistance = flowerSize + 20; // minimum distance between flowers
    const positions: { x: number; y: number }[] = [];
    
    const isValidPosition = (newX: number, newY: number) => {
      return positions.every(pos => {
        const distance = Math.sqrt(
          Math.pow(newX - pos.x, 2) + Math.pow(newY - pos.y, 2)
        );
        return distance >= minDistance;
      });
    };
    
    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let x, y;
      
      do {
        x = Math.random() * (width - flowerSize);
        y = Math.random() * (height - flowerSize);
        attempts++;
      } while (!isValidPosition(x, y) && attempts < 50);
      
      positions.push({ x, y });
    }
    
    return positions.map((pos, i) => ({
      id: i,
      x: pos.x,
      y: pos.y,
    }));
  }, [count, width, height]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {flowers.map((flower) => (
        <View 
          key={flower.id}
          style={[StyleSheet.absoluteFill, { left: flower.x, top: flower.y }]}
        >
          <HeyDayIcon
            name="cuteFlower"
            size={90}
            fill="#E8E8E8"
          />
        </View>
      ))}
    </View>
  );
}

