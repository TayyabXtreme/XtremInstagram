import { Navigate, Route, Routes } from "react-router-dom"
import { AuthPage, HomePage, ProfilePage } from "./pages"
import PageLayout from "./Layouts/PageLayout/PageLayout"

import { auth, firestore } from "./firebase/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import ChatPage from "./pages/ChatPage/ChatPage"
import { useEffect } from "react"
import useChatStore from "./store/chatStore"
import { collection, onSnapshot } from "firebase/firestore"


function App() {

  const [authUser]=useAuthState(auth)

  
   const {addMessages} =useChatStore();

    useEffect(() => {
      const unsubscribe = onSnapshot(collection(firestore, 'messages'), (snapshot) => {
          snapshot.docChanges().forEach((change) => {
              if (change.type === 'added') {
                  addMessages(change.doc.data());
              }
          });
      });
  
      return () => unsubscribe(); 
  }
  , []); 

  return (
    <>
    <PageLayout>
    <Routes>
    <Route path="/" element={authUser ? <HomePage/> : <Navigate to='/auth'/>} />
    <Route path="/auth" element={!authUser ? <AuthPage/> : <Navigate to='/'/>} />
    <Route path="/chat" element={<ChatPage/>}/>
      <Route path="/:username" element={<ProfilePage/>} />
    </Routes>
    </PageLayout>


    </>
  )
}

export default App
