with open('src/app/shop/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Update image src
c = c.replace(
    'src={product.images.main}',
    'src={product.catalogImage || product.images.main}'
)

# 2. Update card info section layout
old_info = """                    {/* Product Info & Actions */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-base tracking-wider uppercase text-obsidian group-hover:text-brass transition-colors">
                          <Link href={`/products/${product.slug}`}>{product.name}</Link>
                        </h3>
                        <p className="text-xs font-mono text-text-muted-dark uppercase tracking-wider mb-2">
                          {product.subtitle}
                        </p>

                        {/* Color Swatches */}
                        <div className="flex items-center gap-1.5 py-1">
                          {product.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full border border-bone-border"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-bone-border/60 mt-3">
                        <span className="font-display text-sm tracking-wide text-obsidian">
                          {product.priceFormatted}
                        </span>

                        <Link
                          href={`/products/${product.slug}`}
                          className="text-xs font-mono tracking-widest uppercase text-obsidian hover:text-brass transition-colors flex items-center gap-1.5 group-hover:translate-x-0.5"
                        >
                          <span>{t.shop.viewProduct}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brass" />
                        </Link>
                      </div>
                    </div>"""

new_info = """                    {/* Product Info & Actions (Matched to Reference 02-shop) */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-display text-base tracking-wider uppercase text-obsidian group-hover:text-brass transition-colors">
                          <Link href={`/products/${product.slug}`}>{product.name}</Link>
                        </h3>
                        <p className="text-xs font-mono text-text-muted-dark uppercase tracking-wider">
                          {product.subtitle}
                        </p>
                      </div>

                      {/* Row 3: Swatches (Left) vs Price (Right) */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                          {product.colors.map((c, i) => (
                            <span
                              key={i}
                              className={`w-3.5 h-3.5 rounded-full border ${
                                i === 0 ? 'border-brass ring-1 ring-brass' : 'border-bone-border'
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                        <span className="font-display text-base tracking-wide text-obsidian font-bold">
                          {product.priceFormatted}
                        </span>
                      </div>

                      {/* Row 4: Full-width VIEW PRODUCT action */}
                      <div className="pt-3 border-t border-bone-border/70">
                        <Link
                          href={`/products/${product.slug}`}
                          className="w-full text-xs font-mono tracking-widest uppercase text-obsidian hover:text-brass transition-colors flex items-center justify-between group-hover:translate-x-0.5"
                        >
                          <span>{t.shop.viewProduct}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brass" />
                        </Link>
                      </div>
                    </div>"""

if old_info in c:
    c = c.replace(old_info, new_info)
    print("Replaced card info successfully!")
else:
    # Try normalized CRLF
    c = c.replace('\r\n', '\n')
    old_info_norm = old_info.replace('\r\n', '\n')
    new_info_norm = new_info.replace('\r\n', '\n')
    if old_info_norm in c:
        c = c.replace(old_info_norm, new_info_norm)
        print("Replaced normalized card info successfully!")
    else:
        print("Warning: old_info not found")

with open('src/app/shop/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated src/app/shop/page.tsx")
