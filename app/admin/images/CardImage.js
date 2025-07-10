export default function CardImage({ image, handleDelete, handleSortChange }) {
  const { id, image_url, sort_order } = image

  return (
    <tr className="border px-2 py-1">
      <td className="border px-2 py-1">
        <img className="w-40" src={image_url} alt={image_url} />
      </td>
      <td className="border px-2 py-1">{image_url}</td>
      <td className="border px-2 py-1">
        <input
          type="number"
          value={sort_order}
          onChange={e => handleSortChange(id, e.target.value)}
          className="w-16 px-1 bg-slate-200 text-right"
        />
      </td>
      <td className="border px-2 py-1 text-red-600">
        <button className="underline" onClick={() => handleDelete(id, image_url)}>Eliminar</button>
      </td>
    </tr>
  )
}
