import { connect, MqttClient } from "mqtt"

const isWildcardTopic = (topic: string) =>
    topic.includes("#") || topic.includes("+")
export default function topicMatchesMQTTWildcard(
    topic: string,
    wildcard: string
) {
    if (topic === wildcard) {
        return []
    } else if (wildcard === "#") {
        return [topic]
    }

    let res = []

    let t = String(topic).split("/")
    let w = String(wildcard).split("/")

    let i = 0
    for (let lt = t.length; i < lt; i++) {
        if (w[i] === "+") {
            res.push(t[i])
        } else if (w[i] === "#") {
            res.push(t.slice(i).join("/"))
            return res
        } else if (w[i] !== t[i]) {
            return null
        }
    }

    if (w[i] === "#") {
        i += 1
    }

    return i === w.length ? res : null
}

interface Client {
    subscribe(topic: string, fn: Function): void
    publish(topic: string, payload: string | number | object): void
    publish(topic: string): void
    unsubscribe(topic: string): void
    getClient(): MqttClient
}

export function createConnection(options: string) {
    let client = connect(options)
    let listeners: Map<string, Array<Function>> = new Map()

    client.on("connect", console.log)
    client.on("disconnect", console.log)
    client.on("error", console.error)

    client.on("message", (messageTopic, message) => {
        listeners.forEach((listenersForTopic, topic) => {
            if (
                messageTopic === topic ||
                (isWildcardTopic(topic) &&
                    topicMatchesMQTTWildcard(messageTopic, topic))
            ) {
                listenersForTopic.forEach(listener => {
                    try {
                        listener(topic, JSON.parse(message.toString()))
                    } catch (error) {
                        listener(topic, {})
                    }
                })
            }
        })
    })

    return function useClient(): Client {
        return {
            subscribe: (topic: string, fn: Function) => {
                        let currentListeners = listeners.get(topic)
                        listeners.set(topic, [...(currentListeners || []), fn])
    
                        // if (!currentListeners) {
                            client.subscribe(topic)
                        // }
                        
                        let newListeners = listeners.get(topic)// ? listeners.get(topic) : []
                        if(!newListeners) {
                            throw new Error(
                                `useClient: ${topic} does not exist`
                            )
                        }
                        // newListeners = newListeners.filter((f) => f !== fn)

                        // if (newListeners.length > 0) {
                        //     listeners.set(topic, newListeners)
                        // } else {
                        //     listeners.delete(topic)
                        //     client.unsubscribe(topic)
                        // }
                    // }
            },
            publish: (
                topic: string,
                payload?: string | number | object
            ) => {
                // client.subscribe(topic)
                if (isWildcardTopic(topic)) {
                    throw new Error(
                        `useTopic: Tried publishing on wildcard topic ${topic}`
                    )
                } else {
                    client.publish(topic, JSON.stringify(payload))
                }
            },
            unsubscribe: (
                topic: string
            ) => {
                listeners.delete(topic)
                client.unsubscribe(topic)
            },
            getClient: () => client
        }
    }
}
