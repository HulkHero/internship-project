import debounce from "lodash.debounce";
import axiosInstance from "./interceptor";
import { GroupBase, OptionsOrGroups } from "react-select";
import { User } from "../pages/Company/Member/types";


const debouncedFetchOptions = debounce(async (inputValue, callback) => {
    try {
      const response = await axiosInstance.get(`/user/search/${inputValue}`);
      const users = response.data.map((user:User) => ({
        value: user._id,
        label: `${user.firstName}  ${user.techRole || ""}`,
        role: user.techRole || "",
      }));
      callback(users);
    } catch (err) {
      callback([]); 
    }
  }, 500);
  
export  const fetchOptions =<T> (inputValue :string, callback:(options: OptionsOrGroups<T, GroupBase<T>>) => void) => {
    debouncedFetchOptions(inputValue, callback);
  };
  