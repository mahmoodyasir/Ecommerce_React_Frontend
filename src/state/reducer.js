export const initialstate = {
    profile:null,
    page_reload: null,
    cart_incomplete: null,
    cart_complete: null,
    admin_profile: null,
    category_product: null,
    only_product:null,
    all_order: null,
    count_state:null,
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
        case "CATEGORY_PRODUCT":
                return {
                    ...state,
                    category_product: action.category_product
                }
         case "ONLY_PRODUCT":
                return {
                    ...state,
                    only_product: action.only_product
                }
         case "ALL_ORDER":
                return {
                    ...state,
                    all_order: action.all_order
                }
         case "COUNT_STATE":
                return {
                    ...state,
                    count_state: action.count_state
                }

        default:
            return this.state;
    }
}

export default reducer;