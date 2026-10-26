with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    c = f.read()

# Normalize CRLF
c = c.replace('\r\n', '\n')

old_def = """  priceFormatted: string;
  images: {"""
new_def = """  priceFormatted: string;
  catalogImage?: string;
  images: {"""
c = c.replace(old_def, new_def, 1)

old_prod1 = """    priceFormatted: 'RM 189',
    images: {"""
new_prod1 = """    priceFormatted: 'RM 189',
    catalogImage: '/assets/products/shop-keris-tuah-jersey-v2.webp',
    images: {"""
c = c.replace(old_prod1, new_prod1, 1)

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated src/data/products.ts successfully!')
