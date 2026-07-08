# Section 4 - Degrade de couleur du fond

Fichier source :

`site-casa-kayam/dist/css/styles.css`

Selecteur concerne :

```css
.s4
```

Propriete qui controle le degrade de fond :

```css
background:
  radial-gradient(ellipse 80% 70% at 70% 80%, rgba(230, 116, 10, 0.46), transparent 60%),
  radial-gradient(ellipse 60% 70% at 20% 20%, rgba(13, 105, 105, 0.36), transparent 60%),
  linear-gradient(135deg, #2a1d10 0%, #3d2818 32%, #1f3030 70%, #0a1818 100%);
```

Ordre des calques, du dessus vers le dessous :

1. Halo orange bas-droite :

```css
radial-gradient(ellipse 80% 70% at 70% 80%, rgba(230, 116, 10, 0.46), transparent 60%)
```

2. Halo vert/teal haut-gauche :

```css
radial-gradient(ellipse 60% 70% at 20% 20%, rgba(13, 105, 105, 0.36), transparent 60%)
```

3. Degrade lineaire de base :

```css
linear-gradient(135deg, #2a1d10 0%, #3d2818 32%, #1f3030 70%, #0a1818 100%)
```

Regles de layout qui influencent la surface visible du degrade :

```css
.s4 {
  padding: 128px 48px 128px;
  position: relative;
  overflow: hidden;
}
```

Responsive :

```css
@media (max-width: 980px) {
  .s4 {
    padding: 80px 24px;
  }
}
```
