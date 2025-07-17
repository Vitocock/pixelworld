export default function Pacman() {
  return (
    <section className="w-full h-[4rem]  relative overflow-hidden">
      <div className="animate-pacman-move pacman">
        <div className="pacman_sprite">
          <svg className="is--close">
            <polygon points="16 0, 36 0, 36 4, 44 4, 44 8, 48 8, 48 16, 52 16, 52 36, 48 36, 48 44, 44 44, 44 48, 36 48, 36 52, 16 52, 16 48, 8 48, 8 44, 4 44, 4 36, 0 36, 0 16, 4 16, 4 8, 8 8, 8 4, 16 4"/>
          </svg>
          <svg className="is--normal">
            <polygon  points="16 0, 36 0, 36 4, 44 4, 44 8, 48 8, 48 16, 52 16, 52 36, 48 36, 48 44, 44 44, 44 48, 36 48, 36 52, 16 52, 16 48, 8 48, 8 44, 4 44, 4 36, 12 36, 12 32, 24 32, 24 28, 36 28, 36 24, 24 24, 24 20, 12 20, 12 16, 4 16, 4 8, 8 8, 8 4, 16 4  "/>
          </svg>
          <svg className="is--open">
            <polygon points="16 0, 36 0, 36 4, 44 4, 44 8, 48 8, 48 16, 52 16, 52 36, 48 36, 48 44, 44 44, 44 48, 36 48, 36 52, 16 52, 16 44, 20 44, 20 40, 24 40, 24 36, 28 36, 28 32, 32 32, 32 28, 36 28, 36 24, 32 24, 32 20, 28 20, 28 16, 24 16, 24 12, 20 12, 20 8, 16 8"/>
          </svg>
        </div>
      </div>
      <div className="ghost -translate-x-14">
        <div className="ghost__body">
          <svg viewBox="0 0 56 48">
            <polygon points="0 24, 4 24, 4 12, 8 12, 8 8, 12 8, 12 4, 20 4, 20 0, 36 0, 36 4, 44 4, 44 8, 48 8, 48 12, 52 12, 52 24, 56 24, 56 48, 0 48" />
          </svg>
        </div>
        <div className="ghost__eye ghost__eye--left">
          <div className="pupil"></div>
        </div>
        <div className="ghost__eye ghost__eye--right">
          <div className="pupil"></div>
        </div>
        <div className="ghost__feet"></div>
      </div>
    </section>
  );
}