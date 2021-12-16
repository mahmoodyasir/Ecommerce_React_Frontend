export const initialstate = {
    profile:null,
    page_reload: null,
    cart_incomplete: null,
    cart_complete: null,
    admin_profile: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "PAGE_RELOAD":
            return {
                ...state,
                page_reload: action.page_reload
            }
        case "ADD_CARTINCOMPLETE":
            return {
                ...state,
                cart_incomplete: action.cart_incomplete
            }
        case "ADD_CARTCOMPLETE":
            return {
                ...state,
                cart_complete: action.cart_complete
            }
        case "ADMIN_PROFILE":
                return {
                    ...state,
                    admin_profile: action.admin_profile
                }
        default:
            return this.state;
    }
}

export default reducer;