import { Box, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import { Navbar, SideBar } from '../../components'
import { useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'

const PageLayout = ({children}) => {
    const {pathname}=useLocation()
    const [user,loading]=useAuthState(auth);
    const canRenderSideBar=pathname !=='/auth' && user;
    const canRenderNavbar = !user && !loading && pathname !=='/auth';
    
    const chekingUserIsAuth=!user && loading;
    if(chekingUserIsAuth) return <PageLayoutSpinner/>


  return (

    
    <Flex flexDir={canRenderNavbar ? 'column' : 'row'} >
        {/* side bar  on the left */}


        {
        !canRenderSideBar ? null : (
        
        <>
          
        
          <Box w={{base:'70px',md:'240px'}}>
          <SideBar />
      </Box>
        

        

        </>
        
        
        )}
        
        {/* Navbar */}
        
        {canRenderNavbar ? <Navbar /> : null}


        {/* The page content on the right */}

        <Box flex={1} w={{base:'calc(100% -70px)',md:'calc(100% -240px)'}} mx={'auto'}>
            {children}
        </Box>
    


    </Flex>

      
  )

}

export default PageLayout


const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};