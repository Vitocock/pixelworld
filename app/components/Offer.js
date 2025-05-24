export default function Offer () {
    return (
      <div className="my-4 flex flex-col  text-black">
        <div className="flex my-4">
          <h2 className="text-3xl font-bold ">Que ofrecemos</h2>
        </div >
        <div className="flex flex-col  align-middle ">
          <div className="text-2xl font-semibold">
            <h4>Diversion:</h4>
          </div>
          <p className="text-xl">
            Tenemos consolas de última generación de Xbox y Playstation 5, además de
            monitores gamer, controles y audifonos
            especiales para una mejor experiencia.
          </p>
          <br />          
          
          <div className="text-2xl font-semibold">
            <h4>¡Llevamos la experiencia gamer a cualquier lugar!</h4>
          </div>
          <p className="text-xl">
            En PixelWorld transformamos cualquier espacio en una sala gamer 
            con módulos a domicilio para hogares, eventos, colegios, empresas y celebraciones.
          </p>
          <br />          
          
          <div className="text-2xl font-semibold">
            <h4>Personal de apoyo</h4>
          </div>
          <p className="text-xl">
            Nuestro equipo técnico asegura la
            instalación rápida, segura y la
            asistencia durante tu evento.
          </p>
        </div>
      </div>
        
    )
}
