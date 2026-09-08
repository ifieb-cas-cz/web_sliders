# web_sliders

Before/after image comparison sliders, published via GitHub Pages at
<https://ifieb-cas-cz.github.io/web_sliders/>

Each comparison is its own standalone page, styled to sit flush and
transparent so it can be embedded elsewhere as an iframe.

## Embedding on the institutional website

Paste one snippet per comparison wherever it should appear. Adjust
`max-width` to fit the surrounding layout.

```html
<iframe src="https://ifieb-cas-cz.github.io/web_sliders/slide-1.html"
        style="width:100%; max-width:480px; aspect-ratio:1; border:0;"
        loading="lazy" title="Comparison 1"></iframe>
```

```html
<iframe src="https://ifieb-cas-cz.github.io/web_sliders/slide-2.html"
        style="width:100%; max-width:480px; aspect-ratio:1; border:0;"
        loading="lazy" title="Comparison 2"></iframe>
```

```html
<iframe src="https://ifieb-cas-cz.github.io/web_sliders/slide-3.html"
        style="width:100%; max-width:480px; aspect-ratio:1; border:0;"
        loading="lazy" title="Comparison 3"></iframe>
```

GitHub Pages does not send `X-Frame-Options`, so framing is allowed by
default. If the target site enforces a CSP, allow-list
`ifieb-cas-cz.github.io` under `frame-src`.
