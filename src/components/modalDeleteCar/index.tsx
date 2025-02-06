import { CarsDashProps } from "../../types"

interface ModalProps {
  carInfo: CarsDashProps
  showModal: (id: string | null) => void
  confirmDelete: (carInfo: CarsDashProps) => void
}

const ModalDeleteCar = ({ carInfo, showModal, confirmDelete }: ModalProps) => {
  function handleShowModal() {
    showModal(null)
  }

  function handleConfirmDelete() {
    confirmDelete(carInfo)
  }

  return (
    <div className="bg-[rgba(47,47,47,0.8)] left-0 top-0 rounded-lg z-40 absolute flex justify-center items-center w-full fadeIn h-full">
      <div className="bg-white w-3/4 h-max flex justify-center items-center flex-col p-4 rounded-lg drop-shadow-xl relative">

        <span>Deseja apagar:</span>
        <strong>{carInfo.name} - {carInfo.year}</strong>

        <button className="bg-green-500 text-white font-medium p-2 rounded-lg w-5/6 mb-2 mt-4 hover:scale-105 transition-all"
          onClick={() => handleShowModal()}
        >Ainda não
        </button>
        <button className="bg-red-500 text-white font-medium p-2 rounded-lg w-5/6 hover:scale-105 transition-all"
          onClick={() => handleConfirmDelete()}
        >Remover</button>

      </div>
    </div>
  )
}

export default ModalDeleteCar