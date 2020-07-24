import { getVehicles } from './vehicles'

/**
 * Register click function to search vehicles
 */
const submitSearch = () => {
  document.getElementById('btn-search').addEventListener('click', () => {
    const search = document.getElementById('input-search').value
    document.getElementById('input-search').dataset.searched = search

    // update the value of the current page to first page
    document.getElementById('list-vehicles').dataset.currentPage = 1

    getVehicles({})
  })
}

export {
  submitSearch
}
