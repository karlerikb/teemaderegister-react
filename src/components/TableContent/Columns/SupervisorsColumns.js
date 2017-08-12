import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const substract = moment()
  .subtract(8, 'months')
  .isBefore(moment().startOf('year'))
const year = substract
  ? moment().startOf('year').subtract(1, 'year')
  : moment().startOf('year')
const yearStart = year.subtract(4, 'months').format('YY')
const yearEnd = year.add(8, 'months').format('YY')

const available = ({ columnKey, order }) => ({
  title: 'Available',
  dataIndex: 'available',
  key: 'available',
  sortOrder: columnKey === 'available' && order,
  className: 'align-col-right',
  sorter: true
})

const defended = ({ columnKey, order }) => ({
  title: 'Total defended',
  dataIndex: 'defended',
  key: 'defended',
  sortOrder: columnKey === 'defended' && order,
  className: 'align-col-right',
  sorter: true
})

const defendedLastYear = ({ columnKey, order }) => ({
  title: 'Defended' + ' ' + yearStart + '/' + yearEnd,
  dataIndex: 'defendedLastYear',
  key: 'defendedLastYear',
  sortOrder: columnKey === 'defendedLastYear' && order,
  className: 'align-col-right',
  sorter: true
})

const registered = ({ columnKey, order }) => ({
  title: 'Registered',
  dataIndex: 'registered',
  key: 'registered',
  sortOrder: columnKey === 'registered' && order,
  className: 'align-col-right',
  sorter: true
})

const supervisor = ({ columnKey, order }) => ({
  title: 'Supervisor',
  dataIndex: 'supervisor',
  key: 'supervisor',
  sortOrder: columnKey === 'supervisor' && order,
  sorter: true,
  render: (supervisor, item) => {
    const url = '/supervisor/' + item.slug
    const content = (
      <Link key={item._id} to={url}>
        {supervisor}
      </Link>
    )
    return content
  }
})

const definedColumns = {
  available,
  defended,
  defendedLastYear,
  registered,
  supervisor
}

const getColumnNames = () => {
  let columns = [
    'supervisor',
    'registered',
    'available',
    'defendedLastYear',
    'defended'
  ] // default

  return columns
}

export default params => {
  const { sub, names, type } = params
  const columns = getColumnNames({ sub, names, type })
  return columns.map(c => {
    return definedColumns[c](params)
  })
}