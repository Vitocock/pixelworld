export default function PricingCard({ plan }) {
  const { name, base_price, resources } = plan;

  const lowerResources = resources.map(r => ({
    ...r,
    name: r.name.toLowerCase()
  }));

  const printed = new Set();
  const itemsToDisplay = [];

  // Mostrar "tiempo" primero si existe y tiene cantidad > 0
  const tiempo = lowerResources.find(r => r.name.includes("tiempo") && r.quantity > 0);
  if (tiempo) {
    itemsToDisplay.push(`Tiempo: ${tiempo.quantity} Hora(s)`);
    printed.add(tiempo.name);
  }

  // Combinaciones definidas
  const combinations = [
    {
      key: "sillas+mesas",
      names: [["silla"], ["mesa"]],
      label: (a, b) => `${a.quantity} silla(s) + ${b.quantity} mesa(s)`,
    },
    {
      key: "controles+headsets",
      names: [["control"], ["headset", "audífono"]],
      label: (a, b) => `${a.quantity} control(es) + ${b.quantity} headset(s)`,
    },
    {
      key: "vr+headsets",
      names: [["vr", "consola vr"], ["headset", "audífono"]],
      label: (a, b) => `${a.quantity} equipo(s) VR + ${b.quantity} headset(s)`,
    },
  ];

  // Función para buscar recurso válido por nombre parcial y cantidad > 0
  const findByName = (keywords) => {
    return lowerResources.find(
      (r) => keywords.some((kw) => r.name.includes(kw)) && r.quantity > 0
    );
  };

  // Agrega combinaciones
  for (const combo of combinations) {
    const [firstMatch, secondMatch] = combo.names.map((group) =>
      findByName(group)
    );
    if (
      firstMatch &&
      secondMatch &&
      !printed.has(firstMatch.name) &&
      !printed.has(secondMatch.name)
    ) {
      itemsToDisplay.push(combo.label(firstMatch, secondMatch));
      printed.add(firstMatch.name);
      printed.add(secondMatch.name);
    }
  }

  // Agrega recursos restantes no combinados y con cantidad > 0
  for (const res of lowerResources) {
    if (printed.has(res.name) || res.quantity <= 0) continue;

    const label = `${res.quantity} ${res.name.charAt(0).toUpperCase() + res.name.slice(1)}`;
    itemsToDisplay.push(label);
    printed.add(res.name);
  }

  return (
    <div className="m-1 group mx-auto min-w-[22.688rem] p-4 lg:p-[1.375rem] relative transform scale-95 hover:scale-100 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] scroll-stroke transition-all duration-300 backdrop-blur-2xl inline-flex flex-col gap-5 overflow-hidden">
      <div className="text-center">
        <img className="size-14 relative" src="./SVGRepo_iconCarrier.svg" alt="icon" />
        <h3 className="pb-5 text-white text-3xl font-['Orbitron'] uppercase leading-tight tracking-wide [text-shadow:_0px_0px_8px_rgb(0_124_255_/_0.60)]">
          {name}
        </h3>
        <span className="py-5 self-stretch justify-center text-white text-3xl font-['Exo'] uppercase leading-tight tracking-wide">
          ${base_price}
        </span>
        <div className="pt-5 justify-between flex flex-row">
          <div className="flex flex-row w-2/5 h-2.5 bg-white rounded-[10px] shadow-[0px_0px_7.9px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>
          <div className="flex flex-row w-2/5 h-2.5 justify-right bg-white rounded-[10px] shadow-[0px_0px_7.9px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>
        </div>
      </div>

      {/* Lista de recursos */}
      <ul className="mb-6 space-y-6 justify-start text-white text-xl orbitron">
        {itemsToDisplay.map((text, i) => (
          <li key={i} className="flex items-center space-x-3">
            <span className="size-1 rounded-full bg-white"></span>
            <span>{text}</span>
          </li>
        ))}
        <li className="flex items-center space-x-3">
          <span className="size-1 rounded-full bg-white"></span>
          <span>Juegos a elección del catálogo</span>
        </li>
      </ul>
    </div>
  );
}