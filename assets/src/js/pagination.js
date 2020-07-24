import { getVehicles } from './vehicles'

/**
 * Register click function to each pagination button
 */
const controlPagination = () => {
  document.getElementById('pagination-first').addEventListener('click', () => setPagination({ first: true }))
  document.getElementById('pagination-previous').addEventListener('click', () => setPagination({ previous: true }))
  document.getElementById('pagination-next').addEventListener('click', () => setPagination({ next: true }))
  document.getElementById('pagination-last').addEventListener('click', () => setPagination({ last: true }))
}

/**
 * Set a new page to render a vehicles from API
 *
 * @param {Boolean} first
 * @param {Boolean} previous
 * @param {Boolean} next
 * @param {Boolean} last
 */
const setPagination = ({ first, previous, next, last }) => {
  const total = document.getElementById('list-vehicles').dataset.totalPages
  let current = parseInt(document.getElementById('list-vehicles').dataset.currentPage)

  let page = 1

  if (next) page = current + 1
  if (previous) page = current - 1
  if (last) page = total

  // update the value of the current page
  document.getElementById('list-vehicles').dataset.currentPage = page

  getVehicles({ page })
}

export {
  controlPagination
}
