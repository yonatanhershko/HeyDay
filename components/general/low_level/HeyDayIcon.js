import * as Icons from "../../../assets/HeyDayIcons"; // make sure all SVGs are exported here

const HeyDayIcon = ({
    name,
    size = 24,
    color = "black",
    style,
    fill,
    ...props
}) => {
    const mod = Icons[name];
    const IconComponent = mod?.default ?? mod;
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in HeyDayIcons.`);
        return null;
    }

    return (
        <IconComponent
            width={size}
            height={size}
            fill={fill}
            style={{ color: color, ...style }}
            {...props}
        />
    );
};

export default HeyDayIcon;
