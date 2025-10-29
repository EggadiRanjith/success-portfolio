export default function TestPage() {
  return (
    <div className="min-h-screen bg-pure-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-h1 text-pure-white mb-8">CSS Test Page</h1>
        
        {/* Test 1: Custom Colors */}
        <section className="p-6 bg-deep-space rounded-lg border border-pure-white/20">
          <h2 className="text-h3 text-light-silver mb-4">Test 1: Custom Colors</h2>
          <div className="space-y-2">
            <div className="h-12 bg-pure-white rounded"></div>
            <div className="h-12 bg-silver-gray rounded"></div>
            <div className="h-12 bg-light-silver rounded"></div>
          </div>
          <p className="text-body text-silver-gray mt-4">
            If you see colored boxes above, custom colors are working.
          </p>
        </section>

        {/* Test 2: Glass Effect */}
        <section className="glass-base p-6 rounded-xl">
          <h2 className="text-h3 text-pure-white mb-4">Test 2: Glass Effect</h2>
          <p className="text-body-lg text-light-silver">
            This card should have a frosted glass effect with backdrop blur.
            The background should be semi-transparent.
          </p>
          <div className="mt-4 p-4 bg-pure-black/30 rounded">
            <p className="text-body-sm text-silver-gray">
              If you see blur/transparency, glass effect is working.
            </p>
          </div>
        </section>

        {/* Test 3: Typography */}
        <section className="p-6 bg-rich-slate rounded-lg">
          <h2 className="text-h3 text-pure-white mb-4">Test 3: Typography Scale</h2>
          <p className="text-display text-pure-white">Display</p>
          <p className="text-h1 text-light-silver">H1 Heading</p>
          <p className="text-h2 text-light-silver">H2 Heading</p>
          <p className="text-h3 text-light-silver">H3 Heading</p>
          <p className="text-body-xl text-silver-gray">Body XL</p>
          <p className="text-body-lg text-silver-gray">Body Large</p>
          <p className="text-body text-silver-gray">Body Regular</p>
          <p className="text-caption text-silver-gray">CAPTION TEXT</p>
        </section>

        {/* Test 4: Spacing */}
        <section className="p-6 bg-dark-charcoal rounded-lg">
          <h2 className="text-h3 text-pure-white mb-4">Test 4: Custom Spacing</h2>
          <div className="space-y-4">
            <div className="p-4 bg-pure-white/10 rounded">Padding: 4 (16px)</div>
            <div className="p-8 bg-pure-white/10 rounded">Padding: 8 (32px)</div>
            <div className="p-12 bg-pure-white/10 rounded">Padding: 12 (48px)</div>
            <div className="p-20 bg-pure-white/10 rounded">Padding: 20 (80px)</div>
          </div>
        </section>

        {/* Test 5: Gradients */}
        <section className="gradient-hero p-8 rounded-xl">
          <h2 className="text-h3 text-pure-white mb-4">Test 5: Gradient Background</h2>
          <p className="text-body-lg text-light-silver">
            This section should have a radial gradient background (dark to black).
          </p>
        </section>

        {/* Summary */}
        <div className="glass-frosted p-8 rounded-2xl border border-pure-white/30">
          <h2 className="text-h2 text-pure-white mb-4">Diagnostic Summary</h2>
          <ul className="space-y-2 text-body text-light-silver">
            <li>✅ If you see this card with blur = Glass CSS working</li>
            <li>✅ If colors match description = Custom colors working</li>
            <li>✅ If text sizes vary = Typography working</li>
            <li>✅ If spacing looks correct = Spacing tokens working</li>
            <li>✅ If gradients visible = Gradient utilities working</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

