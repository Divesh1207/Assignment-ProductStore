import { useLocation, useHistory } from 'react-router-dom';

const useQueryParams = () => {
  const location = useLocation();
  const history = useHistory();

  const getParams = () => {
    return new URLSearchParams(location.search);
  };

  const setParams = (params) => {
    const newParams = new URLSearchParams(params).toString();
    history.push({ search: `?${newParams}` });
  };

  return [getParams, setParams];
};

export default useQueryParams;
