import { useEffect, useState } from "react";
import { View, StyleSheet,Image } from "react-native";
import { useTheme } from "../../../styles/theme";


export function AutoImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const t = useTheme();
    const styles = makeStyles(t);

    const images = [
        require("../../../assets/images/carousel/carouselImg1.png"),
        require("../../../assets/images/carousel/carouselImg2.png"),
        require("../../../assets/images/carousel/carouselImg3.png"),
        require("../../../assets/images/carousel/carouselImg4.png"),
        require("../../../assets/images/carousel/carouselImg5.png"),
    ];

    // Automatically cycle through images every 2.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const getImageIndex = (index) => (index + images.length) % images.length;

    return (
        <View style={styles.galleryContainer}>
            <View style={styles.gallery}>
                {[-1, 0, 1].map((offset) => {
                    const index = getImageIndex(currentIndex + offset);
                    const isCenter = offset === 0;
                    return (
                        <View
                            key={index}
                            style={[
                                styles.imageWrapper,
                                isCenter && styles.centerImage,
                            ]}
                        >
                            <Image
                                source={images[index]}
                                style={styles.image}
                            />
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const makeStyles = (t) =>
    StyleSheet.create({
        galleryContainer: {
            width: "100%",
            maxWidth: '96%', 
            overflow: "hidden",
            alignSelf: "center",
        },
        gallery: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            height: 145,
        },
        imageWrapper: {
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: t.border.md,
            overflow: "hidden",
        },
        centerImage: {
            width: 150, 
            height: 150,
        },
        image: {
            width: "100%",
            height: "100%",
            borderRadius: t.border.md,
        },
    });
