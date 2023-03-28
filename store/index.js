import axios from 'axios'

export const state = () => ({
  token: localStorage.getItem('token') || null,
  popups: [],
  timeout: false
})

export const getter = {
  getToken (state) {
    return state.token
  },
  getPopup (state) {
    return state.popups
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setPopup (state, popup) {
    if (state.popups.length > 10) {
      return
    }
    state.popups.push({
      popupId: state.popups.length + 1,
      popupText: popup.text,
      // popupType: success || danger
      popupType: popup.type,
      popupShowTime: popup.seconds || 2
    })
  },
  deletePopup (state, popupId) {
    const popupIndex = state.popups.findIndex(popup => popup.popupId === popupId.popupId)
    state.popups.splice(popupIndex, 1)
  }
}
