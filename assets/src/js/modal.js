import { fillVehicleForm, cleanVehicleForm, submitVehicleForm } from './vehicles'

/**
 * Register click function to control modal
 */
const controlModal = () => {
  // Open modal with filled form
  document.getElementById('btn-edit-vehicle').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('-hidden')
    const index = document.getElementById('btn-edit-vehicle').dataset.index

    fillVehicleForm({ index })
  })

  // Open modal with clean form
  document.getElementById('btn-new-vehicle').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('-hidden')

    cleanVehicleForm()
  })

  // Close modal
  document.getElementById('btn-close-modal').addEventListener('click', () => {
    document.getElementById('modal').classList.add('-hidden')

    // remove the error message
    document.getElementById('error-msg').classList.add('_none')
  })

  // Submit the form
  document.getElementById('btn-submit-form').addEventListener('click', () => {
    submitVehicleForm()
  })
}

export {
  controlModal
}
