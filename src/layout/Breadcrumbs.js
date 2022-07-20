import React from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Breadcrumbs, Typography, Link } from '@material-ui/core'

function toTitleCase(str) {
   return str.replace(/[^\w\s]/gi, ' ').replace(/_/, ' ').split(' ').map((item) => 
                     item.charAt(0).toUpperCase() + item.slice(1)).join(' ');
}

export default function () {
  let location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const currentPath = location.pathname.split('/')[1];

  return (
    <div style={{display: 'flex', justifyContent:'space-between',paddingBottom: 8}}>
    <Typography color="inherit">
            {toTitleCase(currentPath)}
            
    </Typography>
    <Breadcrumbs aria-label='Breadcrumb'>
      <Link style={{color : 'black'}}  component={RouterLink} to='/'>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        return last ? (
          <Typography color="inherit"  key={to}>
            {toTitleCase(value)}
          </Typography>
        ) : (
          <Link style={{color : 'black'}}  component={RouterLink} to='/' key={to}>
            {toTitleCase(value)}
          </Link>
        )
      })}
    </Breadcrumbs>
    </div>
  )
}
