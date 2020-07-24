import api from './api'

let allVehicles = []

/**
 * Get all vehicles from API, filtering by vehicle name and pagination the results
 *
 * @param {String} page - the current page
 */
const getVehicles = ({ page = 1, index = 0 }) => {
  let vehicle = document.getElementById('input-search').dataset.searched || ''

  api.get(`/vehicles?vehicle=${vehicle}&page=${page}`).then(response => {
    allVehicles = []
    allVehicles.push(response.data.vehicles)

    // update the value of the total pages
    document.getElementById('list-vehicles').dataset.totalPages = response.data.qtdPages

    renderVehiclesList()
    renderVehicleDetails(index)

    // get the current page
    const currentPage = parseInt(document.getElementById('list-vehicles').dataset.currentPage);

    (currentPage === 1) ? document.getElementById('pagination-first').setAttribute('disabled', true) : document.getElementById('pagination-first').removeAttribute('disabled');
    (currentPage === 1) ? document.getElementById('pagination-previous').setAttribute('disabled', true) : document.getElementById('pagination-previous').removeAttribute('disabled');
    (currentPage === response.data.qtdPages) ? document.getElementById('pagination-next').setAttribute('disabled', true) : document.getElementById('pagination-next').removeAttribute('disabled');
    (currentPage === response.data.qtdPages) ? document.getElementById('pagination-last').setAttribute('disabled', true) : document.getElementById('pagination-last').removeAttribute('disabled');
  }).catch(err => {
    console.log(err)
  })
}

/**
 * Submit the form data to create or edit a vehicle
 */
const submitVehicleForm = async () => {
  const id = document.getElementById('input-id').value
  const vehicle = document.getElementById('input-vehicle').value
  const brand = document.getElementById('input-brand').value
  const year = document.getElementById('input-year').value
  const description = document.getElementById('input-description').value

  const data = {
    vehicle,
    brand,
    year,
    description
  }

  try {
    if (id) await api.put(`/vehicles/${id}`, data)
    else await api.post('/vehicles', data)

    // clean the form and close modal
    document.getElementById('modal').classList.add('-hidden')
    cleanVehicleForm()

    const currentPage = parseInt(document.getElementById('list-vehicles').dataset.currentPage)
    const index = document.getElementById('btn-edit-vehicle').dataset.index
    getVehicles({ page: currentPage, index })

    // remove the error message
    document.getElementById('error-msg').classList.add('_none')
  } catch(err) {
    console.log(err.response.data)

    document.getElementById('error-msg').classList.remove('_none')
  }
}

/**
 * Delete a vehicle
 */
const deleteVehicle = () => {
  document.getElementById('btn-delete-vehicle').addEventListener('click', () => {
    const alertResponse = confirm('Tem certeza que deseja deletar esse veículo?')

    if (alertResponse) {
      const index = document.getElementById('btn-delete-vehicle').dataset.index

      const { id } = allVehicles[0][index]

      api.delete(`/vehicles/${id}`).then(response => {
        getVehicles({})
      }).catch(err => {
        console.log(err.response.data)
      })
    }
  })
}

/**
 * Fill the form inputs with the values of selected vehicle
 *
 * @param {Integer} index - index of vehicle in vehicles list
 */
const fillVehicleForm = ({ index }) => {
  const { id, vehicle, brand, year, description, sold } = allVehicles[0][index]

  document.getElementById('input-id').value = id;
  document.getElementById('input-vehicle').value = vehicle;
  document.getElementById('input-brand').value = brand;
  document.getElementById('input-year').value = year;
  document.getElementById('input-description').value = description;

  (sold) ? document.getElementById('label-sold').classList.remove('_none') : document.getElementById('label-sold').classList.add('_none');
}

/**
 * Clean the form inputs
 */
const cleanVehicleForm = () => {
  document.getElementById('input-id').value = ''
  document.getElementById('input-vehicle').value = ''
  document.getElementById('input-brand').value = ''
  document.getElementById('input-year').value = ''
  document.getElementById('input-description').value = ''

  document.getElementById('label-sold').classList.add('_none')
}

/**
 * Render a list of vehicles
 */
const renderVehiclesList = () => {
  document.getElementById('list-vehicles').innerHTML = ''

  allVehicles[0].forEach((vehicle, index) => {
    let li = document.createElement('li')
    let vehicleName = document.createElement('h3')
    let vehicleBrand = document.createElement('span')
    let vehicleYear = document.createElement('span')
    let vehicleEdit = document.createElement('a')

    vehicleBrand.appendChild(document.createTextNode(vehicle.brand))
    vehicleYear.appendChild(document.createTextNode(vehicle.year))
    vehicleEdit.setAttribute('class', 'fa fa-edit fa-1_5x')
    vehicleEdit.setAttribute('data-index', index)
    vehicleEdit.addEventListener('click', () => renderVehicleDetails(index))

    vehicleName.setAttribute('class', '')

    vehicleName.appendChild(document.createTextNode(vehicle.vehicle))
    vehicleName.appendChild(vehicleBrand)
    vehicleName.appendChild(vehicleYear)

    li.appendChild(vehicleName)
    li.appendChild(vehicleEdit)

    document.getElementById('list-vehicles').appendChild(li)
  })
}

/**
 * Render vehicle details
 *
 * @param {Integer} index - index of vehicle in vehicles list
 */
const renderVehicleDetails = (index = 0) => {
  const { vehicle, brand, year, description } = allVehicles[0][index]

  document.getElementById('vehicle-name').innerHTML = vehicle
  document.getElementById('vehicle-brand').innerHTML = brand
  document.getElementById('vehicle-year').innerHTML = year
  document.getElementById('vehicle-description').innerHTML = description
  document.getElementById('btn-edit-vehicle').dataset.index = index
  document.getElementById('btn-delete-vehicle').dataset.index = index
}

export {
  getVehicles,
  deleteVehicle,
  fillVehicleForm,
  cleanVehicleForm,
  submitVehicleForm
}
