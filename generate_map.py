import json
import urllib.request
import math

def generate_svg():
    url = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    print("Downloading GeoJSON...")
    try:
        req = urllib.request.urlopen(url)
        data = json.loads(req.read())
    except Exception as e:
        print(f"Error downloading: {e}")
        return

    # Belize, Costa Rica, El Salvador, Guatemala, Honduras, Nicaragua, Panama, Dominican Republic
    target_ids = ["BLZ", "CRI", "SLV", "GTM", "HND", "NIC", "PAN", "DOM"]
    
    features = [f for f in data["features"] if f["id"] in target_ids]
    
    if not features:
        print("No features found!")
        return

    print(f"Found {len(features)} countries.")

    # Bounding box for scaling (Approximate for Central America + DR)
    # Longitude: -93 to -68
    min_lon, max_lon = -93, -68
    min_lat, max_lat = 7, 20
    
    width = 1000
    height = 1000
    
    # Equirectangular approximation correction factor for Central America (avg lat ~13.5)
    lat_correction = math.cos(math.radians(13.5))
    
    geo_w = (max_lon - min_lon) * lat_correction
    geo_h = (max_lat - min_lat)
    
    scale_x = width / geo_w
    scale_y = height / geo_h
    
    # Use uniform scale to maintain aspect ratio
    scale = min(scale_x, scale_y) * 0.95 # 5% padding
    
    # Offset to center
    x_offset = (width - geo_w * scale) / 2
    y_offset = (height - geo_h * scale) / 2

    # We only want white map, it works perfect for AdditiveBlending
    svg = f'<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'
    svg += f'<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">\n'
    svg += '  <g fill="#ffffff" stroke="none">\n'

    for f in features:
        geom = f["geometry"]
        if geom["type"] == "Polygon":
            polys = [geom["coordinates"]]
        elif geom["type"] == "MultiPolygon":
            polys = geom["coordinates"]
        else:
            continue
            
        for poly in polys:
            # First ring is outer, subsequent are holes (we can just draw them all as path, SVG handles holes if fill-rule is evenodd, but default is non-zero so we must reverse holes if needed. For these countries, holes are rare, but we will just write d=...)
            path_str = ""
            for i, ring in enumerate(poly):
                for j, (lon, lat) in enumerate(ring):
                    x = (lon - min_lon) * lat_correction * scale + x_offset
                    # Mercator-ish approximation (flip Y)
                    y = (max_lat - lat) * scale + y_offset
                    
                    if j == 0:
                        path_str += f"M {x:.2f} {y:.2f} "
                    else:
                        path_str += f"L {x:.2f} {y:.2f} "
                path_str += "Z "
            
            svg += f'    <path d="{path_str}" />\n'

    svg += '  </g>\n</svg>'
    
    path = "c:\\web_antigravity\\prototipo_OAR_v2\\public\\ca_dr_map.svg"
    with open(path, "w", encoding="utf-8") as out:
        out.write(svg)
        
    print(f"Successfully generated {path}")

if __name__ == "__main__":
    generate_svg()
