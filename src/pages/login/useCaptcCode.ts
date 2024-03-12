import { useCallback, useEffect, useState } from "react";
import { getCodeImg } from "@/api/login";


type ICaptcCodeConfig = {
  uuid: string;
  img: string;
  captchaEnabled: boolean;
  registerEnabled: boolean;
}
export default function useCaptcCode () {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<ICaptcCodeConfig>({
    uuid: '',
    img: '',
    captchaEnabled: false,
    registerEnabled: false
  });
  
  const getCode = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getCodeImg();
      setConfig(data)
      return data;
    } finally {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    getCode();
  }, [getCode]);

  return { loading, getCode, ...config }
} 