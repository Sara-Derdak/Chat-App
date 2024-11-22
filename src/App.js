
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./App.css";

const apikey = "3xaqyqptv4yb";

// Liste des utilisateurs avec des images et noms personnalisés
const users = [
  {
    id: "john",
    name: "Sara",
    image: "https://getstream.imgix.net/images/random_svg/S.png",
  },
  {
    id: "jane",
    name: "Khadija",
    image: "https://getstream.imgix.net/images/random_svg/K.png",
  },{
    id: "jane",
    name: "Mohamed",
    image: "https://getstream.imgix.net/images/random_svg/M.png",
  },
  {
    id: "jane",
    name: "Douae",
    image: "https://getstream.imgix.net/images/random_svg/D.png",
  },{
    id: "jane",
    name: "Imrane",
    image: "https://getstream.imgix.net/images/random_svg/I.png",
  },{
    id: "jane",
    name: "Mariem",
    image: "https://getstream.imgix.net/images/random_svg/M.png",
  },
  {
    id: "jane",
    name: "Bilal",
    image: "https://getstream.imgix.net/images/random_svg/B.png",
  },
];

export default function App() {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(users[0]);

  useEffect(() => {
    async function init() {
      // Créez une instance du client Stream Chat
      const chatClient = StreamChat.getInstance(apikey);

      // Connectez l'utilisateur sélectionné au client Stream Chat
      await chatClient.connectUser(
        selectedUser,
        chatClient.devToken(selectedUser.id)
      );

      // Créez un nouveau canal avec un nom personnalisé
      const newChannel = chatClient.channel("messaging", "chat-room", {
        image: "https://www.example.com/chat-room-image.png",
        name: "Chat Room - Discussion générale",
        members: [selectedUser.id],
      });

      // Rejoindre le canal
      await newChannel.watch();
      setChannel(newChannel);
      setClient(chatClient);
    }

    init();

    // Déconnecter l'utilisateur lors du changement d'utilisateur
    if (client) return () => client.disconnectUser();
  }, [selectedUser, client]);

  // Afficher un indicateur de chargement jusqu'à ce que le client et le canal soient chargés
  if (!channel || !client) return <LoadingIndicator />;

  return (
    <div className="app-container">
      {/* Barre latérale avec les utilisateurs */}
      <div className="sidebar">
        <h4>Utilisateurs</h4>
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-card ${
              user.id === selectedUser.id ? "active-user" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <img src={user.image} alt={user.name} className="user-avatar" />
            <span>{user.name}</span>
          </div>
        ))}
      </div>

      {/* Affichage du chat avec le canal sélectionné */}
      <div className="chat-display">
        <Chat client={client} theme="messaging light">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              {/* Message de bienvenue personnalisé */}
              <div className="welcome-container">
                 <p className="welcome-message">
                   Bienvenue <strong>{selectedUser.name}</strong> , dans le
                  canal <em>{channel.data.name}</em> !
           </p>
              </div>
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
}
