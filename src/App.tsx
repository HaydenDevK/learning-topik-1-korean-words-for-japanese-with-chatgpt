import { useCallback, useEffect, useState } from "react";
import "./App.css";

interface TableData {
  korean: string;
  translation: string;
  pronunciationEng: string;
  pronunciationJpn: string;
  example: {
    korean: string;
    pronunciationEng: string;
    pronunciationJpn: string;
  };
  isChecked: boolean;
}

const data: TableData[] = [
  {
    korean: "고양이",
    translation: "猫",
    pronunciationEng: "goyang-i",
    pronunciationJpn: "ゴヤンイ",
    example: {
      korean: "제 친구는 고양이를 키워요.",
      pronunciationEng: "je chinguneun goyang-ireul kiwoyo",
      pronunciationJpn: "チングヌン ゴヤンイル キウォヨ",
    },
    isChecked: false,
  },
  {
    korean: "개",
    translation: "犬",
    pronunciationEng: "gae",
    pronunciationJpn: "ゲ",
    example: {
      korean: "이 동네에는 많은 개가 있어요.",
      pronunciationEng: "i dongneeneun manheun gaega isseoyo",
      pronunciationJpn: "イドンネエン マンフン ゲガ イッソヨ",
    },
    isChecked: false,
  },
  {
    korean: "책",
    translation: "本",
    pronunciationEng: "chaeg",
    pronunciationJpn: "チェグ",
    example: {
      korean: "저는 책을 읽는 것을 좋아해요.",
      pronunciationEng: "jeoneun chaeg-eul ilgeun geoseul johahaeyo",
      pronunciationJpn: "ジョヌン チェグウル イルグン ゴスル ジョハヘヨ",
    },
    isChecked: false,
  },
  {
    korean: "학교",
    translation: "学校",
    pronunciationEng: "hakgyo",
    pronunciationJpn: "ハクギョ",
    example: {
      korean: "학교에서 수업을 들어요.",
      pronunciationEng: "hakgyoeseo sueob-eul deul-eoyo",
      pronunciationJpn: "ハクギョエソ スオブウル トゥルオヨ",
    },
    isChecked: false,
  },
  {
    korean: "음식",
    translation: "食べ物",
    pronunciationEng: "eumsig",
    pronunciationJpn: "ウムシク",
    example: {
      korean: "이 음식은 정말 맛있어요.",
      pronunciationEng: "i eumsigeun jeongmal masisseoyo",
      pronunciationJpn: "イウムシグン ジョンマル マシッソヨ",
    },
    isChecked: false,
  },
  {
    korean: "커피",
    translation: "コーヒー",
    pronunciationEng: "keopi",
    pronunciationJpn: "コーヒ",
    example: {
      korean: "아침에 커피를 마셔요.",
      pronunciationEng: "achime keopileul masyeoyo",
      pronunciationJpn: "アチメ ケオピル マショヨ",
    },
    isChecked: false,
  },
  {
    korean: "사과",
    translation: "林檎",
    pronunciationEng: "sagwa",
    pronunciationJpn: "サグァ",
    example: {
      korean: "사과를 먹고 싶어요.",
      pronunciationEng: "sagwareul meokgo sip-eoyo",
      pronunciationJpn: "サグァルル モッコ シプエヨ",
    },
    isChecked: false,
  },
  {
    korean: "버스",
    translation: "バス",
    pronunciationEng: "beoseu",
    pronunciationJpn: "ベオス",
    example: {
      korean: "버스를 타러 가요",
      pronunciationEng: "beoseuleul taleo gayo",
      pronunciationJpn: "ベオスルル タラオ ガ",
    },
    isChecked: false,
  },
  {
    korean: "지하철",
    translation: "地下鉄",
    pronunciationEng: "jihacheol",
    pronunciationJpn: "ジハチョル",
    example: {
      korean: "지하철을 타면 어디에 가요?",
      pronunciationEng: "jihacheol-eul tamyeon eodie gayo",
      pronunciationJpn: "ジハチョルウル タミョン オデ ガヨ",
    },
    isChecked: false,
  },
  {
    korean: "버튼",
    translation: "ボタン",
    pronunciationEng: "beoteun",
    pronunciationJpn: "ボタン",
    example: {
      korean: "이 버튼을 누르세요.",
      pronunciationEng: "i beoteun-eul nuleuseyo",
      pronunciationJpn: "イ ボタンウル ヌルセヨ",
    },
    isChecked: false,
  },
  {
    korean: "사람",
    translation: "人",
    pronunciationEng: "saram",
    pronunciationJpn: "サラム",
    example: {
      korean: "이곳에는 사람이 많아요.",
      pronunciationEng: "igoseneun saram-i manh-ayo",
      pronunciationJpn: "イゴセヌン サラミ マンハヨ",
    },
    isChecked: false,
  },
  {
    korean: "핸드폰",
    translation: "携帯電話",
    pronunciationEng: "haendeupon",
    pronunciationJpn: "ハエンドゥポン",
    example: {
      korean: "핸드폰 번호를 알아요?",
      pronunciationEng: "haendeupon beonholeul al-ayo",
      pronunciationJpn: "ハエンドゥポン ベオンホルル アラヨ",
    },
    isChecked: false,
  },
  {
    korean: "우유",
    translation: "牛乳",
    pronunciationEng: "uyu",
    pronunciationJpn: "ウユ",
    example: {
      korean: "우유를 마셔도 되나요?",
      pronunciationEng: "uyureul masyeodo doenayo",
      pronunciationJpn: "ウユルル マショド ウェドナヨ",
    },
    isChecked: false,
  },
];

function App() {
  const [tableRows, setTableRows] = useState<TableData[]>(data);

  const onCheckboxClick = useCallback(
    (index: number) => {
      const newTableRow = tableRows.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      );
      // TODO 뭐가 더 나은지
      // const newTableRow = [...tableRows];
      // newTableRow[index].isChecked = !newTableRow[index].isChecked;

      setTableRows(newTableRow);
      localStorage.setItem("koreanList", JSON.stringify(newTableRow));
    },
    [tableRows]
  );

  useEffect(() => {
    // 최초 렌더링 시 로컬스토리지에 저장된 값이 있으면 리스트에 set
    const localList = localStorage.getItem("koreanList");
    if (localList) setTableRows(JSON.parse(localList));
  }, []);

  return (
    <div className="App">
      <header className="App-header">TOPIK 1</header>
      <section className="Table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Korean</th>
              <th>Translation (with Japanese)</th>
              <th>Pronunciation (English)</th>
              <th>Pronunciation (Japanese Katakana)</th>
              <th>Example Sentence</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.korean}</td>
                <td>{item.translation}</td>
                <td>{item.pronunciationEng}</td>
                <td>{item.pronunciationJpn}</td>
                <td>
                  <p>{item.example.korean}</p>
                  <p>
                    <em>{item.example.pronunciationEng}</em>
                  </p>
                  <p>
                    <em>{item.example.pronunciationJpn}</em>
                  </p>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => {
                      onCheckboxClick(index);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
