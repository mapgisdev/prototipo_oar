from PIL import Image

def process_image():
    try:
        img = Image.open('c:\\web_antigravity\\prototipo_OAR_v2\\public\\ca_dr_silhouette.png')
        img = img.convert("RGBA")
        
        # We need to find the background color. Default is dark.
        data = img.getdata()
        new_data = []
        
        for item in data:
            # If dark
            if item[0] < 60 and item[1] < 60 and item[2] < 60:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append((255, 255, 255, 255))
                
        img.putdata(new_data)
        img.save('c:\\web_antigravity\\prototipo_OAR_v2\\public\\ca_dr_silhouette_clean.png', 'PNG')
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

process_image()
