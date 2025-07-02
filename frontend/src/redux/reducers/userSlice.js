import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        data: null,
        token: null
    },
    reducers: {
        login(state, action) {
            state.data = action.payload.data;
            state.token = action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload.data));
            localStorage.setItem("user-token", action.payload.token);
        },
        logout(state) {
            state.data = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("user-token");
        },
        lsToUser(state) {
            const lsUser = localStorage.getItem("user");
            const lsToken = localStorage.getItem("user-token");

            if (lsUser && lsToken) {
                const parsedUser = JSON.parse(lsUser);
                state.data = parsedUser;
                state.token = lsToken;

                // ✅ अगर shipping_address गायब या खाली है तो dummy address डाल दो
                if (!parsedUser.shipping_address || parsedUser.shipping_address.length === 0) {
                    parsedUser.shipping_address = [
                        {
                            name: "Tarachand Kumawat",
                            contact: "9999999999",
                            addressLine1: "Main Road",
                            addressLine2: "Near Temple",
                            city: "Jaipur",
                            state: "Rajasthan",
                            postalCode: "302012",
                            country: "India"
                        }
                    ];
                    state.data = parsedUser;
                    localStorage.setItem("user", JSON.stringify(parsedUser));
                }
            }

            // 🔄 If still no user, apply default dummy
            if (!state.data) {
                const dummyUser = {
                    _id: "dummyuserid123",
                    name: "Tarachand Kumawat",
                    email: "ktarachand381@gmail.com",
                    contact: "9782468792",
                    shipping_address: [
                        {
                            name: "Tarachand Kumawat",
                            contact: "9782468792",
                            addressLine1: "Main Road",
                            addressLine2: "Near Temple",
                            city: "Jaipur",
                            state: "Rajasthan",
                            postalCode: "302012",
                            country: "India"
                        }
                    ]
                };
                state.data = dummyUser;
                state.token = "dummyToken123";
                localStorage.setItem("user", JSON.stringify(dummyUser));
                localStorage.setItem("user-token", "dummyToken123");
            }
        }
    },
});

export const { login, lsToUser, logout } = userSlice.actions;

export default userSlice.reducer;
