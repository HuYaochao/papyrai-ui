// SVG Logo - 8种参数化logo模板
// 属性: template(String), text(String), color(String), size(Number)

import { PapyraiElement, html, css } from '../core/base.js';

export class SVGLogo extends PapyraiElement {
  static properties = {
    template: { type: String },
    text: { type: String },
    color: { type: String },
    size: { type: Number }
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      display: block;
    }

    .logo-text {
      font-family: var(--font-handwrite, cursive);
      font-weight: 700;
    }

    .logo-text-mono {
      font-family: var(--font-mono, monospace);
    }
  `;

  constructor() {
    super();
    this.template = 'stamp';
    this.text = 'AI';
    this.color = '#c4453c';
    this.size = 80;
  }

  render() {
    const templates = {
      stamp: this._renderStamp(),
      seal: this._renderSeal(),
      badge: this._renderBadge(),
      minimal: this._renderMinimal(),
      scroll: this._renderScroll(),
      ribbon: this._renderRibbon(),
      wax: this._renderWax(),
      corner: this._renderCorner()
    };

    return html`<div class="logo-container">${templates[this.template] || templates.stamp}</div>`;
  }

  // 1. stamp - 方形双框印章
  _renderStamp() {
    const s = this.size;
    const padding = s * 0.1;
    const innerBox = s - padding * 2;
    const fontSize = s * 0.35;
    const subFontSize = s * 0.08;

    return html`
      <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
        <!-- 外框 -->
        <rect x="${padding}" y="${padding}" width="${innerBox}" height="${innerBox}"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.03}" opacity="0.8"/>
        <!-- 内框 -->
        <rect x="${padding + s * 0.05}" y="${padding + s * 0.05}" 
          width="${innerBox - s * 0.1}" height="${innerBox - s * 0.1}"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.015}" opacity="0.5"/>
        <!-- 主文字 -->
        <text x="${s/2}" y="${s/2 + fontSize * 0.35}" 
          text-anchor="middle" fill="${this.color}"
          font-family="var(--font-handwrite, cursive)" font-size="${fontSize}" font-weight="700">
          ${this.text}
        </text>
      </svg>
    `;
  }

  // 2. seal - 圆形蜡封
  _renderSeal() {
    const s = this.size;
    const cx = s / 2;
    const cy = s / 2;
    const padding = s * 0.1;
    const outerR = s * 0.45;
    const innerR = s * 0.38;
    const fontSize = s * 0.35;
    const dotSize = s * 0.04;

    return html`
      <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
        <!-- 外圈 -->
        <circle cx="${cx}" cy="${cy}" r="${outerR}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.025}" opacity="0.7"/>
        <!-- 内圈 -->
        <circle cx="${cx}" cy="${cy}" r="${innerR}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.012}" opacity="0.4"/>
        <!-- 装饰点 -->
        <circle cx="${cx}" cy="${padding}" r="${dotSize}" fill="${this.color}" opacity="0.6"/>
        <circle cx="${cx}" cy="${s - padding}" r="${dotSize}" fill="${this.color}" opacity="0.6"/>
        <circle cx="${padding}" cy="${cy}" r="${dotSize}" fill="${this.color}" opacity="0.6"/>
        <circle cx="${s - padding}" cy="${cy}" r="${dotSize}" fill="${this.color}" opacity="0.6"/>
        <!-- 文字 -->
        <text x="${cx}" y="${cy + fontSize * 0.35}" 
          text-anchor="middle" fill="${this.color}"
          font-family="var(--font-handwrite, cursive)" font-size="${fontSize}" font-weight="700">
          ${this.text}
        </text>
      </svg>
    `;
  }

  // 3. badge - 盾牌徽章
  _renderBadge() {
    const s = this.size;
    const cx = s / 2;
    const fontSize = s * 0.28;
    const padding = s * 0.08;

    return html`
      <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
        <!-- 盾牌轮廓 -->
        <path d="M${s*0.5} ${padding} 
                 L${s - padding} ${padding + s*0.1} 
                 Q${s - padding} ${s*0.5} ${s*0.5} ${s - padding}
                 Q${padding} ${s*0.5} ${padding} ${padding + s*0.1} Z"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.025}" opacity="0.8"/>
        <!-- 内部装饰线 -->
        <path d="M${s*0.5} ${padding + s*0.12} 
                 L${s - padding - s*0.05} ${padding + s*0.18} 
                 Q${s - padding - s*0.05} ${s*0.5} ${s*0.5} ${s - padding - s*0.05}
                 Q${padding + s*0.05} ${s*0.5} ${padding + s*0.05} ${padding + s*0.18} Z"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.01}" opacity="0.4"/>
        <!-- 文字 -->
        <text x="${cx}" y="${s/2 + fontSize * 0.4}" 
          text-anchor="middle" fill="${this.color}"
          font-family="var(--font-handwrite, cursive)" font-size="${fontSize}" font-weight="700">
          ${this.text}
        </text>
        <!-- 顶部装饰 -->
        <circle cx="${cx}" cy="${padding * 0.7}" r="${s * 0.035}" fill="${this.color}" opacity="0.6"/>
      </svg>
    `;
  }

  // 4. minimal - 纯文字+下划线
  _renderMinimal() {
    const s = this.size;
    const fontSize = s * 0.4;
    const lineY = s * 0.85;
    const lineWidth = s * 0.7;

    return html`
      <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
        <!-- 文字 -->
        <text x="${s/2}" y="${s/2 + fontSize * 0.3}" 
          text-anchor="middle" fill="${this.color}"
          font-family="var(--font-handwrite, cursive)" font-size="${fontSize}" font-weight="700">
          ${this.text}
        </text>
        <!-- 下划线 -->
        <line x1="${(s - lineWidth)/2}" y1="${lineY}" 
          x2="${(s + lineWidth)/2}" y2="${lineY}"
          stroke="${this.color}" stroke-width="${s * 0.04}" stroke-linecap="round"/>
        <!-- 左侧装饰点 -->
        <circle cx="${(s - lineWidth)/2 - s*0.08}" cy="${lineY}" 
          r="${s * 0.03}" fill="${this.color}" opacity="0.5"/>
      </svg>
    `;
  }

  // 5. scroll - 卷轴纸
  _renderScroll() {
    const s = this.size;
    const fontSize = s * 0.3;
    const rollH = s * 0.15;
    const contentH = s * 0.5;
    const topY = (s - contentH) / 2;

    return html`
      <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
        <!-- 卷轴顶部 -->
        <rect x="${s*0.1}" y="${topY}" width="${s*0.8}" height="${rollH}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.02}"/>
        <circle cx="${s*0.15}" cy="${topY + rollH/2}" r="${rollH * 0.4}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.02}"/>
        <circle cx="${s*0.85}" cy="${topY + rollH/2}" r="${rollH * 0.4}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.02}"/>
        
        <!-- 卷纸主体 -->
        <rect x="${s*0.15}" y="${topY + rollH}" width="${s*0.7}" height="${contentH - rollH}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.015}"/>
        
        <!-- 卷轴底部 -->
        <rect x="${s*0.1}" y="${topY + contentH}" width="${s*0.8}" height="${rollH}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.02}"/>
        <circle cx="${s*0.15}" cy="${topY + contentH + rollH/2}" r="${rollH * 0.4}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.02}"/>
        <circle cx="${s*0.85}" cy="${topY + contentH + rollH/2}" r="${rollH * 0.4}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.02}"/>
        
        <!-- 文字 -->
        <text x="${s/2}" y="${s/2 + fontSize * 0.35}" 
          text-anchor="middle" fill="${this.color}"
          font-family="var(--font-handwrite, cursive)" font-size="${fontSize}" font-weight="700">
          ${this.text}
        </text>
      </svg>
    `;
  }

  // 6. ribbon - 缎带横幅
  _renderRibbon() {
    const s = this.size;
    const fontSize = s * 0.3;
    const ribbonH = s * 0.35;
    const ribbonY = (s - ribbonH) / 2;
    const tailW = s * 0.15;
    const tailH = s * 0.2;

    return html`
      <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
        <!-- 左边尾巴 -->
        <polygon points="${s*0.1},${ribbonY + ribbonH*0.3} ${s*0.1},${ribbonY + ribbonH*0.7} 
                         ${s*0.1 + tailW},${ribbonY + ribbonH + tailH*0.3} 
                         ${s*0.1 + tailW},${ribbonY + ribbonH - tailH*0.3}"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.015}"/>
        <!-- 右边尾巴 -->
        <polygon points="${s*0.9},${ribbonY + ribbonH*0.3} ${s*0.9},${ribbonY + ribbonH*0.7} 
                         ${s*0.9 - tailW},${ribbonY + ribbonH + tailH*0.3} 
                         ${s*0.9 - tailW},${ribbonY + ribbonH - tailH*0.3}"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.015}"/>
        <!-- 横幅主体 -->
        <rect x="${s*0.15}" y="${ribbonY}" width="${s*0.7}" height="${ribbonH}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.02}"/>
        <!-- 内部装饰线 -->
        <rect x="${s*0.18}" y="${ribbonY + s*0.02}" width="${s*0.64}" height="${ribbonH - s*0.04}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.008}" stroke-dasharray="${s * 0.05}"/>
        <!-- 文字 -->
        <text x="${s/2}" y="${ribbonY + ribbonH/2 + fontSize * 0.35}" 
          text-anchor="middle" fill="${this.color}"
          font-family="var(--font-handwrite, cursive)" font-size="${fontSize}" font-weight="700">
          ${this.text}
        </text>
      </svg>
    `;
  }

  // 7. wax - 滴蜡效果
  _renderWax() {
    const s = this.size;
    const fontSize = s * 0.32;
    const cx = s / 2;
    const cy = s / 2;

    return html`
      <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
        <!-- 纸张边缘（不规则） -->
        <path d="M${s*0.2} ${s*0.15} 
                 Q${s*0.5} ${s*0.08} ${s*0.8} ${s*0.15}
                 L${s*0.85} ${s*0.85}
                 Q${s*0.88} ${s*0.5} ${s*0.85} ${s*0.85}
                 L${s*0.15} ${s*0.85}
                 Q${s*0.12} ${s*0.5} ${s*0.15} ${s*0.85}
                 Z"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.015}" opacity="0.5"/>
        
        <!-- 主蜡滴 -->
        <ellipse cx="${cx}" cy="${cy}" rx="${s*0.28}" ry="${s*0.22}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.02}"/>
        
        <!-- 滴落的蜡 -->
        <path d="M${cx + s*0.2} ${cy + s*0.18} 
                 Q${cx + s*0.25} ${cy + s*0.35} ${cx + s*0.18} ${cy + s*0.42}"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.025}" stroke-linecap="round"/>
        <circle cx="${cx + s*0.15}" cy="${cy + s*0.45}" r="${s * 0.04}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.015}"/>
        
        <!-- 小蜡滴装饰 -->
        <circle cx="${cx - s*0.3}" cy="${cy - s*0.2}" r="${s * 0.03}" 
          fill="none" stroke="${this.color}" stroke-width="${s * 0.01}" opacity="0.6"/>
        
        <!-- 文字 -->
        <text x="${cx}" y="${cy + fontSize * 0.35}" 
          text-anchor="middle" fill="${this.color}"
          font-family="var(--font-handwrite, cursive)" font-size="${fontSize}" font-weight="700">
          ${this.text}
        </text>
      </svg>
    `;
  }

  // 8. corner - 折角书签
  _renderCorner() {
    const s = this.size;
    const fontSize = s * 0.35;
    const foldSize = s * 0.25;
    const cx = s / 2;
    const cy = s / 2;

    return html`
      <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
        <!-- 纸张轮廓 -->
        <path d="M${s*0.1} ${s*0.1} 
                 L${s*0.9} ${s*0.1} 
                 L${s*0.9} ${s*0.9} 
                 L${s*0.1} ${s*0.9} Z"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.02}"/>
        
        <!-- 折角 -->
        <path d="M${s*0.9} ${s*0.1} 
                 L${s*0.9} ${s*0.1 + foldSize} 
                 L${s*0.9 - foldSize} ${s*0.1} Z"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.015}" opacity="0.6"/>
        <path d="M${s*0.9 - foldSize} ${s*0.1} 
                 L${s*0.9 - foldSize} ${s*0.1 + foldSize * 0.3}
                 L${s*0.9} ${s*0.1 + foldSize * 0.3}"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.01}" opacity="0.4"/>
        
        <!-- 内部装饰框 -->
        <path d="M${s*0.18} ${s*0.18} 
                 L${s*0.82} ${s*0.18} 
                 L${s*0.82} ${s*0.82} 
                 L${s*0.18} ${s*0.82} Z"
          fill="none" stroke="${this.color}" stroke-width="${s * 0.008}" opacity="0.3"/>
        
        <!-- 文字 -->
        <text x="${cx}" y="${cy + fontSize * 0.35}" 
          text-anchor="middle" fill="${this.color}"
          font-family="var(--font-handwrite, cursive)" font-size="${fontSize}" font-weight="700">
          ${this.text}
        </text>
        
        <!-- 底部装饰线 -->
        <line x1="${s*0.3}" y1="${s*0.75}" x2="${s*0.7}" y2="${s*0.75}"
          stroke="${this.color}" stroke-width="${s * 0.015}" stroke-linecap="round" opacity="0.5"/>
      </svg>
    `;
  }
}

customElements.define('svg-logo', SVGLogo);
