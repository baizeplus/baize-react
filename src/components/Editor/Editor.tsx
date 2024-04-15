import { Spin } from "antd";
import { FC, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { postUploadFile } from "@/api/system/notice";

type IEditorProps = {
  value?: string;
  onChange?: (e: string) => void;
  children?: React.ReactNode;
};
const Editor: FC<IEditorProps> = ({ value, onChange }) => {
  const reactQuillRef = useRef<typeof ReactQuill>();
  const [spinning, setSpinning] = useState(false);

  const handleImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const file = input.files[0];
      const formData = new FormData();

      formData.append("file", file);
      setSpinning(true);
      // Save current cursor state
      const range = reactQuillRef.current.getEditorSelection();

      // Insert temporary loading placeholder image
      reactQuillRef.current.getEditor().insertEmbed(range.index, "image", "/");

      // Move cursor to right side of image (easier to continue typing)
      reactQuillRef.current.getEditorSelection(range.index + 1);
      const { data } = await postUploadFile(formData);
      // Remove placeholder image
      reactQuillRef.current.getEditor().deleteText(range.index, 1);

      setSpinning(false);
      // Insert uploaded image
      setTimeout(() => {
        reactQuillRef.current
          .getEditor()
          .insertEmbed(range.index, "image", data);
      }, 150);
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        handlers: { image: handleImage },
        container: [
          ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
          ["blockquote"], // 引用  代码块 'code-block'
          [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
          [{ indent: "-1" }, { indent: "+1" }], // 缩进
          [{ size: ["small", false, "large", "huge"] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
          [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
          [{ align: [] }], // 对齐方式
          ["link", "image"], // 链接、图片、视频video
          ["clean"], // 清除文本格式
        ],
      },
    };
  }, []);

  const handleOnChange = (e: string) => {
    onChange && onChange(e);
  };

  return (
    <div className="k-h-[245px]">
      <Spin spinning={spinning}>
        <ReactQuill
          ref={reactQuillRef}
          className="relative h-[380px]"
          placeholder="text sample..."
          value={value}
          modules={modules}
          onChange={handleOnChange}
        />
      </Spin>
    </div>
  );
};

export default Editor;
