function hexToRgb(hex: string) {
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return {
        r,
        g,
        b,
    }
}

export default function textColorBasedOnHex(hex: string) {
    let rgb = hexToRgb(hex);

    const brightness = Math.round(((rgb.r * 299) +
        (rgb.g * 587) +
        (rgb.b * 114)) / 1000);

    return (brightness > 175) ? "000000" : "ffffff";
}

export function lighten(hex: string, f: number = 0) {
    let rgb = hexToRgb(hex);

    let r = factor(rgb.r, f);
    let g = factor(rgb.g, f);
    let b = factor(rgb.b, f);

    return `rgb(${r}, ${g}, ${b})`;
}

function factor(v: number, f: number): number {
    let distance = 255 - v;
    return v + (distance * f);
}
