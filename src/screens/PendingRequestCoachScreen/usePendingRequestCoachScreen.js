import { useState, useEffect, useCallback } from 'react';
import { get_assigned_request_by_month, get_personnal_request, get_public_request } from '../../api/Request';

export function usePendingRequestCoachScreen({ navigation, isFocused }) {
  const [personalRequest, setPersonalRequest] = useState([]);
  const [publicRequest, setPublicRequest] = useState([]);
  const [assignedRequest, setAssignedRequest] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    const [personalRes, publicRes, assignedRes] = await Promise.all([
      get_personnal_request(),
      get_public_request(),
      get_assigned_request_by_month(),
    ]);
    setPersonalRequest(personalRes?.data?.requests || []);
    setPublicRequest(publicRes?.data?.requests || []);
    setAssignedRequest(assignedRes?.data?.number || 0);
    setIsRefreshing(false);
    setLoaded(true);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused, loadData]);



  return {
    personalRequest,
    publicRequest,
    assignedRequest,
    loaded,
    isRefreshing,
    loadData,
  };
}
