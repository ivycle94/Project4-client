import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none',
	fontFamily: 'Aldrich',
	fontSize: '1.1em',
}
const authenticatedOptions = (
	<>
		<Nav.Item>
			<Link className='navLinks' to='addSetup' style={linkStyle}>
				Add Setup
			</Link>
		</Nav.Item>
		<Nav.Item>
		    <Link className='navLinks' to='setups' style={linkStyle}>Setups</Link>
        </Nav.Item>
		<Nav.Item>
			<Link className='navLinks' to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link className='navLinks' to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
		<Nav.Item>
		    <Link className='navLinks' to='setups' style={linkStyle}>Setups</Link>
        </Nav.Item>
        <Nav.Item>
		    <Link className='navLinks' to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item>
		    <Link className='navLinks' to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item>
			<Link className='navLinks' to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar  sticky="top" className='navBody' variant='dark' expand='md'>
		<Navbar.Brand>
			<Link to='/'>
				<img className="navIcon" src="https://i.imgur.com/BNMYe97.png" alt=""/>
			</Link>
            <Link to='/' style={linkStyle}>
                Bastion
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='userName'> Welcome, {user.email} </span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
