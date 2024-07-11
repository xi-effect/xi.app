export function CustomBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 200,
        width: '100%',
        height: '100%',
        opacity: 0.3,
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        pointerEvents: 'none', // Ensure that background does not capture mouse events
      }}
    />
  );
}
