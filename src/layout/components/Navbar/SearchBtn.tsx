import { FC, useRef, useState } from "react";
import { Input, InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBtn:FC = () => {
  const inputRef = useRef<InputRef>(null);
  const [isSearch, setIsSearch] = useState(false)

  const handleSearch = () => {
    setIsSearch((f) => !f);
    inputRef.current?.focus();
  }

  return (
    <div className="flex items-center mr-3">
     {/* <Flex className="mr-3"> */}
      <SearchOutlined className="text-[20px]" onClick={handleSearch} />
      <Input 
        ref={inputRef}
        onBlur={() => setIsSearch(false)}
        placeholder={isSearch ? '搜索' : ''}
        autoFocus={isSearch} 
        className={`transition-[width] ease-in-out h-[38px] ${isSearch ? 'w-full !ml-3 border' : '!w-0 !p-0 !border-0'}`}/>
    {/* </Flex> */}
    </div>
  )
};

export default SearchBtn;